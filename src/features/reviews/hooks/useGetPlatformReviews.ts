import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPlatformReviews } from "../services/reviews.service";
import { reviewsKeys } from "./reviewsKeys";
import type { ReviewsQueryParams } from "../types";

export function useGetPlatformReviews(params: ReviewsQueryParams = {}) {
  return useQuery({
    queryKey: reviewsKeys.list(params),
    queryFn: () => getPlatformReviews(params),
    placeholderData: keepPreviousData,
  });
}
