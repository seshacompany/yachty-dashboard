import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useForm,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getForgotPasswordEmail } from "../lib/forgotPasswordCookies";
import { handleVerifyOtp } from "../lib/handleVerifyOtp";
import {
  verifyOtpSchema,
  type VerifyOtpFormValues,
} from "../schemas/forgotPassword.schema";

const REDIRECT_DELAY_MS = 3000;

export type VerifyOtpFormBindings = {
  register: UseFormRegister<VerifyOtpFormValues>;
  handleSubmit: UseFormHandleSubmit<VerifyOtpFormValues>;
  submitVerifyOtp: (data: VerifyOtpFormValues) => Promise<void>;
  errors: FieldErrors<VerifyOtpFormValues>;
  isSubmitting: boolean;
  successMessage: string | null;
};

export function useVerifyOtpForm(): VerifyOtpFormBindings {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const email = getForgotPasswordEmail();
    if (!email) {
      toast.warning(
        "انتهت صلاحية الجلسة أو البريد الإلكتروني غير موجود، يرجى إعادة الطلب.",
      );
      navigate("/auth/forgot-password", { replace: true });
    }

    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, [navigate]);

  const { register, handleSubmit, formState, setError } =
    useForm<VerifyOtpFormValues>({
      resolver: zodResolver(verifyOtpSchema),
      defaultValues: { otp: "" },
    });

  const submitVerifyOtp = useCallback(
    async (data: VerifyOtpFormValues) => {
      setSuccessMessage(null);
      await handleVerifyOtp(data, setError, navigate, (message) => {
        setSuccessMessage(message);
        setIsRedirecting(true);
        redirectTimerRef.current = setTimeout(() => {
          navigate("/auth/reset-password");
        }, REDIRECT_DELAY_MS);
      });
    },
    [navigate, setError],
  );

  return {
    register,
    handleSubmit,
    submitVerifyOtp,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting || isRedirecting,
    successMessage,
  };
}
