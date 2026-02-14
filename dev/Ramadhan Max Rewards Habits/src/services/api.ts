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

// ---- Telemetry types ----

export interface TelemetryData {
  totalUsers: number;
  usersByProvider: { google: number; microsoft: number; other: number };
  recentSignups: Array<{ displayName: string; email: string; createdAt: string; provider: string }>;
  signupsByDay: Array<{ date: string; count: number }>;
  activeUsers: number;
  usersActiveToday: number;
  usersActiveThisWeek: number;
  lastActivityTimes: Array<{ displayName: string; updatedAt: string }>;
  totalDeedsCompleted: number;
  averageCompletionPercent: number;
  usersWithQuranProgress: number;
  averageQuranJuz: number;
  dailyActivity: Array<{ day: number; activeUsers: number; avgCompletion: number }>;
  queriedAt: string;
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

export async function fetchTelemetry(): Promise<TelemetryData> {
  const res = await fetch("/api/admin/telemetry");
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Telemetry failed (${res.status})`);
  }
  return res.json();
}
