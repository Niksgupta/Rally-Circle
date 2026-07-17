import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import { fetchUserProfile, subscribeAuth, type UserProfile } from "@pp/shared";

interface AuthContextValue {
  configured: boolean;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  configured: false,
  user: null,
  profile: null,
  loading: false,
});

export function AuthProvider({
  configured,
  children,
}: {
  configured: boolean;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(configured);

  useEffect(() => {
    if (!configured) return;
    const unsub = subscribeAuth(async (u) => {
      setUser(u);
      if (u) {
        try {
          const p = await fetchUserProfile(u.uid);
          setProfile(p);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [configured]);

  const value = useMemo(
    () => ({ configured, user, profile, loading }),
    [configured, user, profile, loading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
