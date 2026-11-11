import { z } from "zod";

export const termFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "العنوان مطلوب (3 أحرف على الأقل)"),
  content: z
    .string()
    .trim()
    .min(5, "المحتوى مطلوب (5 أحرف على الأقل)"),
  isActive: z.boolean(),
});

export type TermFormValues = z.infer<typeof termFormSchema>;
