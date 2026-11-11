import { ForgotPasswordCard } from "../components/organisms/ForgotPasswordCard";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export function ForgotPassword() {
  const forgotPasswordForm = useForgotPasswordForm();

  return (
    <ForgotPasswordCard {...forgotPasswordForm} />
  );
}
