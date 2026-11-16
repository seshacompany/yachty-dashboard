import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthLoadingScreen } from "@/features/auth/components/atoms/AuthLoadingScreen";
import { clearTokens, getRefreshToken } from "@/lib/tokenStorage";

export function ProtectedRoute() {
  const { accessToken, isInitializing } = useAuth();
  const hasRefreshToken = Boolean(getRefreshToken());
  const isAuthorized = Boolean(accessToken && hasRefreshToken);

  useEffect(() => {
    if (!isInitializing && !isAuthorized) {
      clearTokens();
    }
  }, [isInitializing, isAuthorized]);

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthorized) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
