import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { requireAuth } from "../lib/auth.js";
import { getProfilesContainer } from "../lib/cosmos.js";

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

