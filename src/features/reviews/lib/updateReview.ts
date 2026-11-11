import { api } from "@/lib/axios";
import type { UpdateReviewType } from "../schemas/edit.review";

export const updateReview = async (
  id: string,
  reviewData: UpdateReviewType,
) => {
  const { data } = await api.patch(`/customers-feedback/${id}`, reviewData);
  return data;
};
