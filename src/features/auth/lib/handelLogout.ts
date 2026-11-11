import { clearTokens } from "@/lib/tokenStorage";
import { authApi } from "@/features/auth/services/authApi";
import type { NavigateFunction } from "react-router-dom";

export const handelLogout = async (
  navigate?: NavigateFunction,
  onLogoutSuccess?: () => void
) => {
  try {
    await authApi.logout();
  } catch {
    // Ignore network error during logout
  } finally {
    clearTokens();
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }
    if (navigate) {
      navigate("/auth/login", { replace: true });
    }
  }
};