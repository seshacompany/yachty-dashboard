import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AuthLoadingScreen } from "@/features/auth/components/atoms/AuthLoadingScreen";
import { getRefreshToken } from "@/lib/tokenStorage";

export function PublicRoute() {
  const { accessToken, isInitializing } = useAuth();
  const hasRefreshToken = Boolean(getRefreshToken());

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (accessToken && hasRefreshToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
