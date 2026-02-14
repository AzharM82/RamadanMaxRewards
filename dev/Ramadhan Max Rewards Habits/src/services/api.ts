// ---- Auth types ----

export interface AuthMeIdentity {
  provider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

export interface AuthMeResponse {
  clientPrincipal: AuthMeIdentity | null;
}

// ---- Profile types ----

export interface UserProfile {
  id: string;
  userId: string;
  email: string;
  displayName: string;
  identityProvider: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Progress types ----

export interface ProgressData {
  habits: Record<string, Record<string, boolean>>;
  quran: Record<string, number>;
}

// ---- API functions ----

export async function fetchAuthMe(): Promise<AuthMeResponse> {
  const res = await fetch("/.auth/me");
  if (!res.ok) throw new Error("Failed to fetch auth info");
  return res.json();
}

export async function fetchProfile(): Promise<UserProfile | null> {
  const res = await fetch("/api/profile");
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function createProfile(displayName: string): Promise<UserProfile> {
  const res = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ displayName }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Failed to create profile (${res.status})`);
  }
  return res.json();
}

export async function fetchProgress(): Promise<ProgressData> {
  const res = await fetch("/api/progress");
  if (!res.ok) throw new Error("Failed to fetch progress");
  return res.json();
}

export async function saveAllProgress(habits: Record<string, Record<string, boolean>>, quran: Record<string, number>): Promise<ProgressData> {
  const res = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ habits, quran }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Failed to save progress (${res.status})`);
  }
  return res.json();
}
