import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, AuthMeIdentity } from '../services/api';
import { fetchAuthMe, fetchProfile, createProfile as apiCreateProfile } from '../services/api';

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  needsProfile: boolean;
  identity: AuthMeIdentity | null;
  profile: UserProfile | null;
  createProfile: (displayName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [identity, setIdentity] = useState<AuthMeIdentity | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [needsProfile, setNeedsProfile] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const authMe = await fetchAuthMe();
        if (cancelled) return;

        if (!authMe.clientPrincipal) {
          setLoading(false);
          return;
        }

        setIdentity(authMe.clientPrincipal);

        const userProfile = await fetchProfile();
        if (cancelled) return;

        if (userProfile) {
          setProfile(userProfile);
        } else {
          setNeedsProfile(true);
        }
      } catch {
        // Auth check failed — user not logged in
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  const createProfile = useCallback(async (displayName: string) => {
    const newProfile = await apiCreateProfile(displayName);
    setProfile(newProfile);
    setNeedsProfile(false);
  }, []);

  const logout = useCallback(() => {
    window.location.href = "/.auth/logout";
  }, []);

  const isAuthenticated = identity !== null;
  const isAdmin = identity?.userRoles.includes("admin") ?? false;

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        isAdmin,
        needsProfile,
        identity,
        profile,
        createProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
