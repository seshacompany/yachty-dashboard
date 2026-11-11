import { z } from "zod";

export const CreateReviewSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "الاسم مطلوب"),

    position: z
        .string()
        .trim()
        .min(3, "المسمى الوظيفي يجب ألا يقل عن 3 أحرف"),

    stars: z.coerce.number<number>()
        .min(1, "التقييم أقل حاجة 1")
        .max(5, "التقييم أكبر حاجة 5"),

    description: z
        .string()
        .trim()
        .min(3, "يجب أن يحتوي التقييم على 3 أحرف على الأقل"),
});

export type CreateReviewType = z.infer<typeof CreateReviewSchema>;