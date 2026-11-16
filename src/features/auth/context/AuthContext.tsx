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
  type ReactNode,
} from "react";

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user,
    accessToken,
    isAuthenticated,
    isInitializing,
    setAuth,
    setAccessToken,
    setUser,
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
      return false;
    }

    inFlightRefreshPromise = (async () => {
      try {
        const refreshResponse = await authApi.refresh(storedRefreshToken);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh");
        }

        setAccessToken(newAccessToken);

        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        const meResponse = await authApi.getMe();
        const userData = meResponse.data;
        setUser(userData);

        return true;
      } catch {
        clearTokens();
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
      // 1. Store refreshToken securely in browser cookies
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }

      // 2. Store accessToken (in-memory only) and user in Zustand auth store
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

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
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
