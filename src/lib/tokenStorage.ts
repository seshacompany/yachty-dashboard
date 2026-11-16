import Cookies from "js-cookie";
import { useAuthStore } from "@/features/auth/store/authStore";

const REFRESH_TOKEN_KEY = "refreshToken";

// Helper to remove any legacy tokens from localStorage if they exist
try {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("accessToken");
  }
} catch {
  // Ignore storage access errors in restricted environments
}

export const getAccessToken = (): string | null => {
  return useAuthStore.getState().accessToken;
};

export const setAccessToken = (token: string | null): void => {
  useAuthStore.getState().setAccessToken(token);
};

export const subscribeAccessToken = (
  listener: (token: string | null) => void
): (() => void) => {
  return useAuthStore.subscribe((state) => listener(state.accessToken));
};

export const getRefreshToken = (): string | null => {
  try {
    return Cookies.get(REFRESH_TOKEN_KEY) || null;
  } catch {
    return null;
  }
};

export const setRefreshToken = (token: string): void => {
  try {
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      expires: 1,
      path: "/",
      sameSite: "strict",
      secure:
        typeof window !== "undefined" && window.location.protocol === "https:",
    });
  } catch {
    // Ignore cookie write errors
  }
};

export const removeRefreshToken = (): void => {
  try {
    Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
  } catch {
    // Ignore cookie removal errors
  }
};

export const clearTokens = (): void => {
  useAuthStore.getState().clearAuth();
  removeRefreshToken();
};

