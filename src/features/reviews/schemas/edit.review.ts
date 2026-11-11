import { z } from "zod";
import { CreateReviewSchema } from "./create.review";

export const UpdateReviewSchema = CreateReviewSchema.extend({
    status: z
        .string()
        .trim()
        .min(3, "يجب تحديد الحالة"),
});

export type UpdateReviewType = z.infer<typeof UpdateReviewSchema>;