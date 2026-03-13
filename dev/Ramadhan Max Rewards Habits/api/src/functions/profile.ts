import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requireAuth } from "../lib/auth.js";
import { getProfilesClient, getEntity, upsertEntity } from "../lib/cosmos.js";

app.http("ProfileGet", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "profile",
  handler: async (req: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      const principal = requireAuth(req);
      const client = getProfilesClient();
      const entity = await getEntity(client, principal.userId);

      if (!entity) {
        return { status: 404, jsonBody: { error: "Profile not found" } };
      }

      return {
        status: 200,
        jsonBody: {
          id: entity.rowKey,
          userId: entity.rowKey,
          email: entity.email,
          displayName: entity.displayName,
          identityProvider: entity.identityProvider,
          role: entity.role,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        },
      };
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      _context.error("ProfileGet error:", err.message, err.stack);
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

      const client = getProfilesClient();
      const now = new Date().toISOString();

      const adminEmail = process.env.ADMIN_EMAIL || "";
      const role = principal.userDetails.toLowerCase() === adminEmail.toLowerCase() ? "admin" : "user";

      const profile = {
        partitionKey: "default",
        rowKey: principal.userId,
        email: principal.userDetails,
        displayName: body.displayName.trim(),
        identityProvider: principal.identityProvider,
        role,
        createdAt: now,
        updatedAt: now,
      };

      await upsertEntity(client, profile);

      return {
        status: 200,
        jsonBody: {
          id: profile.rowKey,
          userId: profile.rowKey,
          email: profile.email,
          displayName: profile.displayName,
          identityProvider: profile.identityProvider,
          role: profile.role,
          createdAt: profile.createdAt,
          updatedAt: profile.updatedAt,
        },
      };
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        return { status: 401, jsonBody: { error: "Unauthorized" } };
      }
      context.error("ProfilePost error:", err.message, err.stack);
      return { status: 500, jsonBody: { error: err.message || "Internal server error" } };
    }
  },
});
