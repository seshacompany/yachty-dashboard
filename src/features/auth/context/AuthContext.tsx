/* eslint-disable react-refresh/only-export-components */
import { authApi } from "@/features/auth/services/authApi";
import {
  clearTokens,
  getRefreshToken,
  setRefreshToken,
} from "@/lib/tokenStorage";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { User } from "@/types/auth";
import type { StaffPermission } from "@/features/employees/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  accessTokenExpiresAt: number | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (data: { accessToken: string; refreshToken: string; user: User }) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  refreshAuth: () => Promise<boolean>;
  hasPermission: (permission: StaffPermission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let inFlightRefreshPromise: Promise<boolean> | null = null;

// Trigger proactive refresh 30 seconds before the 15-minute access_token expires
const PROACTIVE_REFRESH_BUFFER_MS = 30 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user,
    accessToken,
    accessTokenExpiresAt,
    isAuthenticated,
    isInitializing,
    setAuth,
    setAccessToken,
    setUser,
    setIsInitializing,
  } = useAuthStore();

  const logout = useCallback(async () => {
    try {
      await authApi.logout(getRefreshToken());
    } catch {
      // Ignore network errors during logout
    } finally {
      clearTokens();
    }
  }, []);

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    if (inFlightRefreshPromise) {
      return inFlightRefreshPromise;
    }

    const storedRefreshToken = getRefreshToken();
    if (!storedRefreshToken) {
      clearTokens();
      return false;
    }

    inFlightRefreshPromise = (async () => {
      try {
        const refreshResponse = await authApi.refresh(storedRefreshToken);
        const newAccessToken = refreshResponse.data?.access_token;
        const newRefreshToken = refreshResponse.data?.refresh_token;
        const returnedUser = refreshResponse.data?.user;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh");
        }

        // Save new in-memory accessToken (and 15-minute expiry timestamp) in Zustand
        setAccessToken(newAccessToken);

        // Update user data in Zustand if returned by refresh endpoint
        if (returnedUser) {
          setUser(returnedUser);
        }

        // Rotate refresh_token cookie with a fresh 1-day expiry if returned
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        return true;
      } catch {
        clearTokens();
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/auth/")
        ) {
          window.location.replace("/auth/login");
        }
        return false;
      } finally {
        inFlightRefreshPromise = null;
      }
    })();

    return inFlightRefreshPromise;
  }, [setAccessToken, setUser]);

  const login = useCallback(
    ({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: newUser,
    }: {
      accessToken: string;
      refreshToken: string;
      user: User;
    }) => {
      // 1. Store refresh_token in 1-day cookie
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }

      // 2. Store access_token (in-memory only) and user in Zustand store
      setAuth({ accessToken: newAccessToken, user: newUser });
    },
    [setAuth]
  );

  const hasPermission = useCallback(
    (permission: StaffPermission): boolean => {
      if (!user) return false;
      const adminType = (user.admin_type || user.adminType || "").toUpperCase();
      if (adminType === "ADMIN") return true;
      if (adminType === "STAFF") {
        return Boolean(user.permissions?.includes(permission));
      }
      return true;
    },
    [user]
  );

  // Silent refresh on app initialization / page reload
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const storedRefreshToken = getRefreshToken();

      if (!storedRefreshToken) {
        if (isMounted) {
          clearTokens();
          setIsInitializing(false);
        }
        return;
      }

      try {
        await refreshAuth();
      } finally {
        if (isMounted) {
          setIsInitializing(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [refreshAuth, setIsInitializing]);

  // Proactive 15-minute token renewal timer
  useEffect(() => {
    if (!accessToken || !accessTokenExpiresAt) return;

    const delayMs = Math.max(
      0,
      accessTokenExpiresAt - Date.now() - PROACTIVE_REFRESH_BUFFER_MS,
    );

    const timerId = setTimeout(() => {
      void refreshAuth();
    }, delayMs);

    return () => {
      clearTimeout(timerId);
    };
  }, [accessToken, accessTokenExpiresAt, refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        accessTokenExpiresAt,
        isAuthenticated,
        isInitializing,
        login,
        logout,
        setUser,
        refreshAuth,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
