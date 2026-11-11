import { z } from "zod";

export const faqFormSchema = z.object({
  question: z
    .string()
    .trim()
    .min(3, "السؤال مطلوب (3 أحرف على الأقل)"),
  answer: z
    .string()
    .trim()
    .min(5, "الإجابة مطلوبة (5 أحرف على الأقل)"),
  isActive: z.boolean(),
  sortOrder: z.number().optional(),
});

export type FaqFormValues = z.infer<typeof faqFormSchema>;
