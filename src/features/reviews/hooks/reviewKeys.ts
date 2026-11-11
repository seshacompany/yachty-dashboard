import type { GetReviewsParams } from "../lib/getReviews";

export const reviewKeys = {
  all: ["reviews"] as const,
  lists: () => [...reviewKeys.all, "list"] as const,
  list: (params: GetReviewsParams) => [...reviewKeys.lists(), params] as const,
  totals: () => [...reviewKeys.all, "total"] as const,
  total: (search: string) => [...reviewKeys.totals(), search] as const,
};
