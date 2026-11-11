import { z } from "zod";
import { CreateFrequentlyAskedQuestionsSchema } from "./create.FrequentlyAskedQuestions";

export const UpdateFrequentlyAskedQuestionsSchema = CreateFrequentlyAskedQuestionsSchema.extend({
    status: z
        .string()
        .trim()
        .min(3, "يجب تحديد الحالة"),
});

export type UpdateFrequentlyAskedQuestionsType = z.infer<typeof UpdateFrequentlyAskedQuestionsSchema>;