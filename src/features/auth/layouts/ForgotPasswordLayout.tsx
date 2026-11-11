import { LoginBrandHeader } from "@/features/auth/components/organisms/LoginBrandHeader";
import { LoginPageLayout } from "@/features/auth/components/templates/LoginPageLayout";
import { Outlet } from "react-router-dom";

export function ForgotPasswordLayout() {
  return (
    <LoginPageLayout>
      <LoginBrandHeader />
      <Outlet />
    </LoginPageLayout>
  );
}
