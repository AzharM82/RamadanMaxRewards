import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getClientPrincipal } from "../lib/auth.js";

app.http("GetRoles", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "GetRoles",
  handler: async (req: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    const principal = getClientPrincipal(req);
    const adminEmail = process.env.ADMIN_EMAIL || "";

    const roles: string[] = [];

    if (principal && principal.userDetails.toLowerCase() === adminEmail.toLowerCase()) {
      roles.push("admin");
    }

    return {
      status: 200,
      jsonBody: { roles },
    };
  },
});
