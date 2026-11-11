import { ResetPasswordCard } from "../components/organisms/ResetPasswordCard";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";

export function ResetPassword() {
  const resetPasswordForm = useResetPasswordForm();
  return (
    <ResetPasswordCard {...resetPasswordForm} />
  );
}
