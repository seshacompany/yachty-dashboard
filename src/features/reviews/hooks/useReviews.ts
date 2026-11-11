import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getReviews, type GetReviewsParams } from "../lib/getReviews";
import { reviewKeys } from "./reviewKeys";

export function useReviews(params: GetReviewsParams) {
  return useQuery({
    queryKey: reviewKeys.list(params),
    queryFn: () => getReviews(params),
    placeholderData: keepPreviousData,
  });
}
