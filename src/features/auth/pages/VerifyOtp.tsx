import { VerifyOtpCard } from "../components/organisms/VerifyOtpCard";
import { useVerifyOtpForm } from "../hooks/useVerifyOtpForm";

export function VerifyOtp() {
  const verifyOtpForm = useVerifyOtpForm();
  return (
    <VerifyOtpCard {...verifyOtpForm} />
  );
}
