import { z } from "zod";

export const updateReviewSchema = z.object({
  status: z.enum(["PUBLISHED", "REJECTED"]),
  isFeatured: z.boolean(),
});

export type UpdateReviewValues = z.infer<typeof updateReviewSchema>;
export type UpdateReviewFormValues = UpdateReviewValues;
