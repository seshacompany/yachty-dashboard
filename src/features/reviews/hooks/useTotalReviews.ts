import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTotalReviews } from "../lib/getTotalReviews";
import { reviewKeys } from "./reviewKeys";

export function useTotalReviews(search: string) {
  return useQuery({
    queryKey: reviewKeys.total(search),
    queryFn: () => getTotalReviews(search),
    placeholderData: keepPreviousData,
  });
}
