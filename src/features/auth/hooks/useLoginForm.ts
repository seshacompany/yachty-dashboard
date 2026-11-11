import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  useForm,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login.schema";
import { handelLogin } from "../lib/handelLogin";
import { useAuth } from "./useAuth";

export type LoginFormBindings = {
  register: UseFormRegister<LoginFormValues>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  submitLogin: (data: LoginFormValues) => void;
  errors: FieldErrors<LoginFormValues>;
  isSubmitting: boolean;
};

export function useLoginForm(): LoginFormBindings {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState, setError } =
    useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "", password: "" },
    });

  const submitLogin = useCallback(
    (data: LoginFormValues) => handelLogin(data, setError, navigate, login),
    [setError, navigate, login],
  );

  return {
    register,
    handleSubmit,
    submitLogin,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
  };
}
