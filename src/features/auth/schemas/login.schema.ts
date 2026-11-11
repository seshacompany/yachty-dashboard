import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "أدخل البريد الالكتروني صحيح"),
  password: z.string().min(1, "أدخل كلمة المرور"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
