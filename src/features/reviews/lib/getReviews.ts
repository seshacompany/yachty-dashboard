import { api } from "@/lib/axios";
import type { reviewItemType } from "../types";

export type GetReviewsParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type GetReviewsResponse = {
  data: reviewItemType[];
  totalPage: number;
};

export const getReviews = async ({
  search,
  page = 1,
  limit = 10,
}: GetReviewsParams = {}): Promise<GetReviewsResponse> => {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.client_name = search;

  const { data: result } = await api.get("/customers-feedback", { params });

  return {
    data: result.data.items ?? [],
    totalPage: result.data.totalPages ?? 0,
  };
};
