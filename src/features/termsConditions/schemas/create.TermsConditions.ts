import { z } from "zod";

export const CreateTermsConditionsSchema = z.object({
  question: z
    .string()
    .trim()
    .min(2, "الشرط مطلوب"),
  answer: z
    .string()
    .trim()
    .min(2, "المحتوى مطلوب"),
  isActive: z.boolean().optional(),
});

export type CreateTermsConditionsType = z.infer<typeof CreateTermsConditionsSchema>;