import { LoginAuthCard } from "@/features/auth/components/organisms/LoginAuthCard";
import { LoginBrandHeader } from "@/features/auth/components/organisms/LoginBrandHeader";
import { LoginPageLayout } from "@/features/auth/components/templates/LoginPageLayout";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

export default function LoginPage() {
  const loginForm = useLoginForm();

  return (
    <LoginPageLayout>
      <LoginBrandHeader />
      <LoginAuthCard {...loginForm} />
    </LoginPageLayout>
  );
}
