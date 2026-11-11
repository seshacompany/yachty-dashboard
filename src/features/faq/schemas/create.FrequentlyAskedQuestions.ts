import { z } from "zod";

export const CreateFrequentlyAskedQuestionsSchema = z.object({
    question: z
        .string()
        .trim()
        .min(3, "السؤال مطلوب"),

    answer: z
        .string()
        .trim()
        .min(3, "الإجابة مطلوبة"),
});

export type CreateFrequentlyAskedQuestionsType = z.infer<typeof CreateFrequentlyAskedQuestionsSchema>;