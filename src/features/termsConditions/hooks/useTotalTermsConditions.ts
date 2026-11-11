import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTotalTermsConditions } from "../lib/getTotalTermsConditions";
import { termsConditionsKeys } from "./termsConditionsKeys";

export function useTotalTermsConditions(search: string) {
  return useQuery({
    queryKey: termsConditionsKeys.total(search),
    queryFn: () => getTotalTermsConditions(search),
    placeholderData: keepPreviousData,
  });
}
