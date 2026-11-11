import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "البريد الإلكتروني مطلوب")
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const verifyOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "البريد الإلكتروني مطلوب"),

    otp: z
        .string()
        .min(6, "رمز التحقق يجب أن يكون 6 أرقام")
        .max(6, "رمز التحقق يجب أن يكون 6 أرقام")
        .regex(/^\d+$/, "رمز التحقق يجب أن يحتوي على أرقام فقط"),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "البريد الإلكتروني مطلوب"),

    newPassword: z
        .string()
        .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
        .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
        .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
        .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل"),
});

export type resetPasswordFormValues = z.infer<typeof resetPasswordSchema>;