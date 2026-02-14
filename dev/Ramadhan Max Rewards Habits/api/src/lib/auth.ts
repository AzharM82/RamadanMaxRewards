import { HttpRequest } from "@azure/functions";

export interface ClientPrincipal {
  identityProvider: string;
  userId: string;
  userDetails: string; // email
  userRoles: string[];
}

export function getClientPrincipal(req: HttpRequest): ClientPrincipal | null {
  const header = req.headers.get("x-ms-client-principal");
  if (!header) return null;

  try {
    const decoded = Buffer.from(header, "base64").toString("utf-8");
    const principal = JSON.parse(decoded) as ClientPrincipal;
    return principal;
  } catch {
    return null;
  }
}

export function requireAuth(req: HttpRequest): ClientPrincipal {
  const principal = getClientPrincipal(req);
  if (!principal) {
    throw new Error("Unauthorized");
  }
  return principal;
}
