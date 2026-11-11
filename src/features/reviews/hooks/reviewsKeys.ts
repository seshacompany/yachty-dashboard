import type { ReviewsQueryParams } from "../types";

export const reviewsKeys = {
  all: ["platform-reviews"] as const,
  lists: () => [...reviewsKeys.all, "list"] as const,
  list: (params: ReviewsQueryParams = {}) => [...reviewsKeys.lists(), params] as const,
  details: () => [...reviewsKeys.all, "detail"] as const,
  detail: (id: string) => [...reviewsKeys.details(), id] as const,
};

// Alias for backwards compatibility
export const reviewKeys = reviewsKeys;
