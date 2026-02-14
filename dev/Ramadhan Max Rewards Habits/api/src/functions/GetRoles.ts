import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

app.http("GetRoles", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "GetRoles",
  handler: async (req: HttpRequest, _context: InvocationContext): Promise<HttpResponseInit> => {
    const body = (await req.json()) as { userDetails?: string } | null;
    const adminEmail = process.env.ADMIN_EMAIL || "";

    const roles: string[] = [];

    if (body?.userDetails && body.userDetails.toLowerCase() === adminEmail.toLowerCase()) {
      roles.push("admin");
    }

    return {
      status: 200,
      jsonBody: { roles },
    };
  },
});
