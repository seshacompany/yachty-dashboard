import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { useForm, type FieldErrors, type UseFormHandleSubmit, type UseFormRegister } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleVerifyOtp } from "../lib/handleVerifyOtp";
import { verifyOtpSchema, type VerifyOtpFormValues } from "../schemas/forgotPassword.schema";

export type VerifyOtpFormBindings = {
    register: UseFormRegister<VerifyOtpFormValues>;
    handleSubmit: UseFormHandleSubmit<VerifyOtpFormValues>;
    submitVerifyOtp: (data: VerifyOtpFormValues) => void;
    errors: FieldErrors<VerifyOtpFormValues>;
    isSubmitting: boolean;
};

export function useVerifyOtpForm() {
    const navigate = useNavigate();
    const email = Cookies.get("email-forgot-password")

    const { register, handleSubmit, formState, setError } = useForm<VerifyOtpFormValues>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: { email: email, otp: "" },
    });

    const submitVerifyOtp = useCallback((data: VerifyOtpFormValues) => {
        handleVerifyOtp(data, setError, navigate)
    }, [navigate, setError]);

    return {
        register,
        handleSubmit,
        submitVerifyOtp,
        errors: formState.errors,
        isSubmitting: formState.isSubmitting,
    };
}