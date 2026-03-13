import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requireAuth } from "../lib/auth.js";
import { getProgressClient, getEntity, upsertEntity } from "../lib/cosmos.js";

app.http("ProgressGet", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "progress",
  handler: async (req: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);
      const client = getProgressClient();
      const entity = await getEntity(client, principal.userId);

      if (!entity) {
        return { status: 200, jsonBody: { habits: {}, quran: {} } };
      }

      return {
        status: 200,
        jsonBody: {
          habits: entity.habits ? JSON.parse(entity.habits as string) : {},
          quran: entity.quran ? JSON.parse(entity.quran as string) : {},
        },
      };
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

      const client = getProgressClient();
      const now = new Date().toISOString();

      const entity = {
        partitionKey: "default",
        rowKey: principal.userId,
        habits: JSON.stringify(body.habits),
        quran: JSON.stringify(body.quran),
        updatedAt: now,
      };

      await upsertEntity(client, entity);

      return {
        status: 200,
        jsonBody: {
          habits: body.habits,
          quran: body.quran,
        },
      };
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      context.error("ProgressPost error:", err.message, err.stack);
      return { status: 500, jsonBody: { error: err.message || "Internal server error" } };
    }
  },
});
