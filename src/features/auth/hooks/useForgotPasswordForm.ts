import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useForm,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleForgotPassword } from "../lib/handleForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../schemas/forgotPassword.schema";

const REDIRECT_DELAY_MS = 3000;

export type ForgotPasswordFormBindings = {
  register: UseFormRegister<ForgotPasswordFormValues>;
  handleSubmit: UseFormHandleSubmit<ForgotPasswordFormValues>;
  submitForgotPassword: (data: ForgotPasswordFormValues) => Promise<void>;
  errors: FieldErrors<ForgotPasswordFormValues>;
  isSubmitting: boolean;
  successMessage: string | null;
};

export function useForgotPasswordForm(): ForgotPasswordFormBindings {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const { register, handleSubmit, formState, setError } =
    useForm<ForgotPasswordFormValues>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: { email: "" },
    });

  const submitForgotPassword = useCallback(
    async (data: ForgotPasswordFormValues) => {
      setSuccessMessage(null);
      await handleForgotPassword(data, setError, (message) => {
        setSuccessMessage(message);
        setIsRedirecting(true);
        redirectTimerRef.current = setTimeout(() => {
          navigate("/auth/verify-otp");
        }, REDIRECT_DELAY_MS);
      });
    },
    [navigate, setError],
  );

  return {
    register,
    handleSubmit,
    submitForgotPassword,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting || isRedirecting,
    successMessage,
  };
}
