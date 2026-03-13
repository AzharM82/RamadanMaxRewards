import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requireAuth } from "../lib/auth.js";
import { getProfilesClient, getProgressClient, listAllEntities } from "../lib/cosmos.js";

app.http("AdminTelemetry", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "telemetry",
  handler: async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);

      const adminEmail = process.env.ADMIN_EMAIL || "";
      if (principal.userDetails.toLowerCase() !== adminEmail.toLowerCase()) {
        return { status: 403, jsonBody: { error: "Forbidden" } };
      }

      const profilesClient = getProfilesClient();
      const progressClient = getProgressClient();

      const profiles = await listAllEntities(profilesClient);
      const progressEntities = await listAllEntities(progressClient);

      // Parse progress docs (habits/quran stored as JSON strings in Table Storage)
      const progressDocs = progressEntities.map((e) => ({
        userId: e.rowKey as string,
        habits: e.habits ? JSON.parse(e.habits as string) : {},
        quran: e.quran ? JSON.parse(e.quran as string) : {},
        updatedAt: e.updatedAt as string || "",
      }));

      const displayNameMap = new Map<string, string>();
      for (const p of profiles) {
        displayNameMap.set(p.rowKey as string, (p.displayName as string) || "");
      }

      const totalUsers = profiles.length;

      const usersByProvider = { google: 0, microsoft: 0, other: 0 };
      for (const p of profiles) {
        const provider = ((p.identityProvider as string) || "").toLowerCase();
        if (provider === "google") usersByProvider.google++;
        else if (provider === "aad" || provider === "azureactivedirectory") usersByProvider.microsoft++;
        else usersByProvider.other++;
      }

      const sortedProfiles = [...profiles]
        .filter((p) => p.createdAt)
        .sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime());
      const recentSignups = sortedProfiles.slice(0, 10).map((p) => ({
        displayName: (p.displayName as string) || "",
        email: (p.email as string) || "",
        createdAt: p.createdAt as string,
        provider: (p.identityProvider as string) || "",
      }));

      const signupDayCounts = new Map<string, number>();
      for (const p of profiles) {
        if (p.createdAt) {
          const date = (p.createdAt as string).substring(0, 10);
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
