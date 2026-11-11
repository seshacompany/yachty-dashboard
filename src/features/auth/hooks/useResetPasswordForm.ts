import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { useForm, type FieldErrors, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleResetPassword } from "../lib/handleResetPassword";
import { resetPasswordSchema, type resetPasswordFormValues } from "../schemas/forgotPassword.schema";

export type ResetPasswordFormBindings = {
    register: UseFormRegister<resetPasswordFormValues>;
    handleSubmit: UseFormHandleSubmit<resetPasswordFormValues>;
    submitResetPassword: (data: resetPasswordFormValues) => void;
    errors: FieldErrors<resetPasswordFormValues>;
    isSubmitting: boolean;
};

export function useResetPasswordForm() {
    const navigate = useNavigate();
    const email = Cookies.get("email-forgot-password")

    const { register, handleSubmit, formState, setError } = useForm<resetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { email: email, newPassword: "" },
    });

    const submitResetPassword = useCallback((data: resetPasswordFormValues) => {
        handleResetPassword(data, setError, navigate)
    }, [navigate, setError]);

    return {
        register,
        handleSubmit,
        submitResetPassword,
        errors: formState.errors,
        isSubmitting: formState.isSubmitting,
    };
}