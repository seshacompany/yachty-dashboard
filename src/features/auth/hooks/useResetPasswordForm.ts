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
import { getResetToken } from "../lib/forgotPasswordCookies";
import { handleResetPassword } from "../lib/handleResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "../schemas/forgotPassword.schema";

const REDIRECT_DELAY_MS = 3000;

export type ResetPasswordFormBindings = {
  register: UseFormRegister<ResetPasswordFormValues>;
  handleSubmit: UseFormHandleSubmit<ResetPasswordFormValues>;
  submitResetPassword: (data: ResetPasswordFormValues) => Promise<void>;
  errors: FieldErrors<ResetPasswordFormValues>;
  isSubmitting: boolean;
  successMessage: string | null;
};

export function useResetPasswordForm(): ResetPasswordFormBindings {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetToken = getResetToken();
    if (!resetToken) {
      toast.error(
        "رمز إعادة تعيين كلمة المرور غير موجود أو منتهي الصلاحية، يرجى إعادة المحاولة.",
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
    useForm<ResetPasswordFormValues>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: { newPassword: "" },
    });

  const submitResetPassword = useCallback(
    async (data: ResetPasswordFormValues) => {
      setSuccessMessage(null);
      await handleResetPassword(data, setError, navigate, (message) => {
        setSuccessMessage(message);
        setIsRedirecting(true);
        redirectTimerRef.current = setTimeout(() => {
          navigate("/auth/login", { replace: true });
        }, REDIRECT_DELAY_MS);
      });
    },
    [navigate, setError],
  );

  return {
    register,
    handleSubmit,
    submitResetPassword,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting || isRedirecting,
    successMessage,
  };
}
