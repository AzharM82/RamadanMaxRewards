import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requireAuth } from "../lib/auth.js";
import { getProgressContainer } from "../lib/cosmos.js";

app.http("ProgressGet", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "progress",
  handler: async (req: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);
      const container = getProgressContainer();

      try {
        const { resource } = await container.item(principal.userId, principal.userId).read();
        if (!resource) {
          return {
            status: 200,
            jsonBody: { habits: {}, quran: {} },
          };
        }
        return {
          status: 200,
          jsonBody: {
            habits: resource.habits || {},
            quran: resource.quran || {},
          },
        };
      } catch (err: any) {
        if (err.code === 404) {
          return {
            status: 200,
            jsonBody: { habits: {}, quran: {} },
          };
        }
        throw err;
      }
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      return { status: 500, jsonBody: { error: err.message || "Internal server error" } };
    }
  },
});

app.http("ProgressPost", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "progress",
  handler: async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);
      const body = (await req.json()) as {
        habits: Record<string, Record<string, boolean>>;
        quran: Record<string, number>;
      };

      if (!body.habits || !body.quran) {
        return { status: 400, jsonBody: { error: "habits and quran are required" } };
      }

      const container = getProgressContainer();
      const now = new Date().toISOString();

      const doc = {
        id: principal.userId,
        userId: principal.userId,
        habits: body.habits,
        quran: body.quran,
        updatedAt: now,
      };

      const { resource } = await container.items.upsert(doc);
      return {
        status: 200,
        jsonBody: {
          habits: resource!.habits,
          quran: resource!.quran,
        },
      };
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      context.error("ProgressPost error:", err.message, err.code, err.stack);
      return { status: 500, jsonBody: { error: err.message || "Internal server error" } };
    }
  },
});
