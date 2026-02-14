import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requireAuth } from "../lib/auth.js";
import { getProfilesContainer, getProgressContainer } from "../lib/cosmos.js";

app.http("ProfileGet", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "profile",
  handler: async (req: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);
      const container = getProfilesContainer();

      try {
        const { resource } = await container.item(principal.userId, principal.userId).read();
        if (!resource) {
          return { status: 404, jsonBody: { error: "Profile not found" } };
        }
        return { status: 200, jsonBody: resource };
      } catch (err: any) {
        if (err.code === 404) {
          return { status: 404, jsonBody: { error: "Profile not found" } };
        }
        throw err;
      }
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      _context.error("ProfileGet error:", err.message, err.code, err.stack);
      return { status: 500, jsonBody: { error: err.message || "Internal server error" } };
    }
  },
});

app.http("ProfilePost", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "profile",
  handler: async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);
      const body = (await req.json()) as { displayName?: string };

      if (!body.displayName || body.displayName.trim().length === 0) {
        return { status: 400, jsonBody: { error: "displayName is required" } };
      }

      const container = getProfilesContainer();
      const now = new Date().toISOString();

      const adminEmail = process.env.ADMIN_EMAIL || "";
      const role = principal.userDetails.toLowerCase() === adminEmail.toLowerCase() ? "admin" : "user";

      const profile = {
        id: principal.userId,
        userId: principal.userId,
        email: principal.userDetails,
        displayName: body.displayName.trim(),
        identityProvider: principal.identityProvider,
        role,
        createdAt: now,
        updatedAt: now,
      };

      // Upsert: create or replace
      const { resource } = await container.items.upsert(profile);
      return { status: 200, jsonBody: resource };
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      context.error("ProfilePost error:", err.message, err.code, err.stack);
      return { status: 500, jsonBody: { error: err.message || "Internal server error" } };
    }
  },
});

app.http("AdminTelemetry", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "admin-telemetry",
  handler: async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);

      const adminEmail = process.env.ADMIN_EMAIL || "";
      if (principal.userDetails.toLowerCase() !== adminEmail.toLowerCase()) {
        return { status: 403, jsonBody: { error: "Forbidden" } };
      }

      const profilesContainer = getProfilesContainer();
      const progressContainer = getProgressContainer();

      const { resources: profiles } = await profilesContainer.items
        .query({ query: "SELECT c.userId, c.identityProvider, c.createdAt, c.displayName, c.email FROM c" })
        .fetchAll();

      const { resources: progressDocs } = await progressContainer.items
        .query({ query: "SELECT c.userId, c.habits, c.quran, c.updatedAt FROM c" })
        .fetchAll();

      const displayNameMap = new Map<string, string>();
      for (const p of profiles) {
        displayNameMap.set(p.userId, p.displayName || "");
      }

      const totalUsers = profiles.length;

      const usersByProvider = { google: 0, microsoft: 0, other: 0 };
      for (const p of profiles) {
        const provider = (p.identityProvider || "").toLowerCase();
        if (provider === "google") usersByProvider.google++;
        else if (provider === "aad" || provider === "azureactivedirectory") usersByProvider.microsoft++;
        else usersByProvider.other++;
      }

      const sortedProfiles = [...profiles]
        .filter((p) => p.createdAt)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const recentSignups = sortedProfiles.slice(0, 10).map((p) => ({
        displayName: p.displayName || "",
        email: p.email || "",
        createdAt: p.createdAt,
        provider: p.identityProvider || "",
      }));

      const signupDayCounts = new Map<string, number>();
      for (const p of profiles) {
        if (p.createdAt) {
          const date = p.createdAt.substring(0, 10);
          signupDayCounts.set(date, (signupDayCounts.get(date) || 0) + 1);
        }
      }
      const signupsByDay = Array.from(signupDayCounts.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

      const activeUsers = progressDocs.length;

      const now = new Date();
      const todayStr = now.toISOString().substring(0, 10);
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      let usersActiveToday = 0;
      let usersActiveThisWeek = 0;
      for (const doc of progressDocs) {
        if (doc.updatedAt) {
          if (doc.updatedAt.substring(0, 10) === todayStr) usersActiveToday++;
          if (new Date(doc.updatedAt) >= sevenDaysAgo) usersActiveThisWeek++;
        }
      }

      const sortedProgress = [...progressDocs]
        .filter((d) => d.updatedAt)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      const lastActivityTimes = sortedProgress.slice(0, 10).map((d) => ({
        displayName: displayNameMap.get(d.userId) || "",
        updatedAt: d.updatedAt,
      }));

      let totalDeedsCompleted = 0;
      let totalCompletionSum = 0;
      let totalUserDays = 0;

      for (const doc of progressDocs) {
        const habits = doc.habits as Record<string, Record<string, boolean>> | undefined;
        if (!habits) continue;
        for (const dayKey of Object.keys(habits)) {
          const dayData = habits[dayKey];
          if (!dayData || typeof dayData !== "object") continue;
          const keys = Object.keys(dayData);
          if (keys.length === 0) continue;
          let trueCount = 0;
          for (const k of keys) {
            if (dayData[k] === true) { trueCount++; totalDeedsCompleted++; }
          }
          totalCompletionSum += (trueCount / keys.length) * 100;
          totalUserDays++;
        }
      }

      const averageCompletionPercent =
        totalUserDays > 0 ? Math.round((totalCompletionSum / totalUserDays) * 100) / 100 : 0;

      let usersWithQuranProgress = 0;
      let totalMaxJuz = 0;
      for (const doc of progressDocs) {
        const quran = doc.quran as Record<string, number> | undefined;
        if (!quran) continue;
        const values = Object.values(quran).filter((v) => typeof v === "number");
        if (values.length === 0) continue;
        usersWithQuranProgress++;
        totalMaxJuz += Math.max(...values);
      }

      const averageQuranJuz =
        usersWithQuranProgress > 0
          ? Math.round((totalMaxJuz / usersWithQuranProgress) * 100) / 100
          : 0;

      const dailyActivity: Array<{ day: number; activeUsers: number; avgCompletion: number }> = [];
      for (let day = 1; day <= 30; day++) {
        const dayStr = String(day);
        let dayActiveUsers = 0;
        let dayCompletionSum = 0;
        for (const doc of progressDocs) {
          const habits = doc.habits as Record<string, Record<string, boolean>> | undefined;
          if (!habits || !habits[dayStr]) continue;
          const dayData = habits[dayStr];
          const keys = Object.keys(dayData);
          if (keys.length === 0) continue;
          dayActiveUsers++;
          let trueCount = 0;
          for (const k of keys) { if (dayData[k] === true) trueCount++; }
          dayCompletionSum += (trueCount / keys.length) * 100;
        }
        dailyActivity.push({
          day,
          activeUsers: dayActiveUsers,
          avgCompletion: dayActiveUsers > 0 ? Math.round((dayCompletionSum / dayActiveUsers) * 100) / 100 : 0,
        });
      }

      return {
        status: 200,
        jsonBody: {
          totalUsers, usersByProvider, recentSignups, signupsByDay,
          activeUsers, usersActiveToday, usersActiveThisWeek, lastActivityTimes,
          totalDeedsCompleted, averageCompletionPercent,
          usersWithQuranProgress, averageQuranJuz,
          dailyActivity,
          queriedAt: new Date().toISOString(),
        },
      };
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      context.error("AdminTelemetry error:", err.message, err.code, err.stack);
      return { status: 500, jsonBody: { error: err.message || "Internal server error" } };
    }
  },
});
