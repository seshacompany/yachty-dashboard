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
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (data: { accessToken: string; refreshToken: string; user: User }) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  refreshAuth: () => Promise<boolean>;
  hasPermission: (permission: StaffPermission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Module-level lock to prevent duplicate concurrent refresh flows across all callers
let inFlightRefreshPromise: Promise<boolean> | null = null;

const AUTO_REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes (300,000 ms)

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    user,
    accessToken,
    isAuthenticated,
    isInitializing,
    setAuth,
    setAccessToken,
    setUser,
    setIsInitializing,
  } = useAuthStore();

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore network errors during logout
    } finally {
      clearTokens();
    }
  }, []);

  const refreshAuth = useCallback(async (): Promise<boolean> => {
    // If a refresh flow is already in-flight, reuse the same promise to prevent duplicate requests
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
        // Step 1: POST /auth/refresh with { refreshToken } from 1-day Cookie
        const refreshResponse = await authApi.refresh(storedRefreshToken);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          refreshResponse.data;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh");
        }

        // Step 2: Update accessToken inside Zustand auth store
        setAccessToken(newAccessToken);

        // Step 3: Update refreshToken in Cookie if a new one was provided
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }

        // Step 4: Fetch latest user data
        const meResponse = await authApi.getMe();
        const userData = meResponse.data;

        // Verify status
        if (userData?.status !== "ACTIVE") {
          throw new Error("Account is not active");
        }

        // Step 5: If STAFF, fetch permissions and job title from /admin/staff/me
        if (userData?.adminType === "STAFF") {
          try {
            const staffMeResponse = await authApi.getStaffMe();
            if (staffMeResponse?.data) {
              userData.permissions = staffMeResponse.data.permissions || [];
              userData.jobTitle = staffMeResponse.data.jobTitle || null;
            }
          } catch (staffError) {
            console.error("Failed to fetch staff details during refresh:", staffError);
          }
        }

        // Step 6: Update Zustand auth store
        setUser(userData);

        return true;
      } catch (error) {
        clearTokens();
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/auth/login" &&
          !window.location.pathname.startsWith("/auth/")
        ) {
          window.location.href = "/auth/login";
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
      // 1. Store refreshToken only in 1-day Cookie
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }

      // 2. Store accessToken and user in Zustand auth store
      setAuth({ accessToken: newAccessToken, user: newUser });
    },
    [setAuth]
  );

  const hasPermission = useCallback(
    (permission: StaffPermission): boolean => {
      if (!user) return false;
      if (user.adminType === "ADMIN") return true;
      if (user.adminType === "STAFF") {
        return Boolean(user.permissions?.includes(permission));
      }
      return false;
    },
    [user]
  );

  // Initial auth check on app startup / page reload
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const storedRefreshToken = getRefreshToken();

      // If there is NO refreshToken in Cookie, finish immediately as unauthenticated
      if (!storedRefreshToken) {
        if (isMounted) {
          clearTokens();
          setIsInitializing(false);
        }
        return;
      }

      // Execute deduplicated refresh flow: /auth/refresh -> update Zustand -> /users/me
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

  // Automatic 5-minute background token refresh without page reload
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const intervalId = setInterval(async () => {
      const success = await refreshAuth();
      if (!success) {
        clearInterval(intervalId);
      }
    }, AUTO_REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [isAuthenticated, accessToken, refreshAuth]);

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
