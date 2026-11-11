import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { useForm, type FieldErrors, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleForgotPassword } from "../lib/handleForgotPassword";
import {
    forgotPasswordSchema,
    type ForgotPasswordFormValues,
} from "../schemas/forgotPassword.schema";

export type ForgotPasswordFormBindings = {
    register: UseFormRegister<ForgotPasswordFormValues>;
    handleSubmit: UseFormHandleSubmit<ForgotPasswordFormValues>;
    submitForgotPassword: (data: ForgotPasswordFormValues) => void;
    errors: FieldErrors<ForgotPasswordFormValues>;
    isSubmitting: boolean;
};

export function useForgotPasswordForm() {
    const navigate = useNavigate();

    const { register, handleSubmit, formState, setError } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const submitForgotPassword = useCallback((data: ForgotPasswordFormValues) => {
        Cookies.set("email-forgot-password", data.email)

        handleForgotPassword(data, setError, navigate)
    }, [navigate, setError]);

    return {
        register,
        handleSubmit,
        submitForgotPassword,
        errors: formState.errors,
        isSubmitting: formState.isSubmitting,
    };
}