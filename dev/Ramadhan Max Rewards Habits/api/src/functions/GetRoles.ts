import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

app.http("GetRoles", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "GetRoles",
  handler: async (req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    try {
      let userDetails = "";

      try {
        const body = (await req.json()) as { userDetails?: string } | null;
        userDetails = body?.userDetails ?? "";
      } catch {
        // Body might be empty or not JSON — log and continue with no roles
        context.warn("GetRoles: could not parse request body");
      }

      const adminEmail = process.env.ADMIN_EMAIL || "";
      const roles: string[] = [];

      if (userDetails && adminEmail && userDetails.toLowerCase() === adminEmail.toLowerCase()) {
        roles.push("admin");
      }

      context.log(`GetRoles: userDetails=${userDetails || "(empty)"}, roles=[${roles.join(",")}]`);

      return {
        status: 200,
        jsonBody: { roles },
      };
    } catch (err: any) {
      // NEVER return 500 — it would break the SWA login flow entirely
      context.error("GetRoles unexpected error:", err.message);
      return {
        status: 200,
        jsonBody: { roles: [] },
      };
    }
  },
});
