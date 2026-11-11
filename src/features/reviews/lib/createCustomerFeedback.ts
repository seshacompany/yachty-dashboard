import { api } from "@/lib/axios";
import type { CreateReviewType } from "../schemas/create.review";

export const createCustomerFeedback = async (reviewData: CreateReviewType) => {
  const { data } = await api.post("/customers-feedback", reviewData);
  return data;
};
