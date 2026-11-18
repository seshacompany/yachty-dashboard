import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("أدخل بريد إلكتروني صحيح"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "رمز التحقق يجب أن يكون 6 أرقام"),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل"),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
