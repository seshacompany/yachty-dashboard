import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTermsConditionsItem, type GetTermsConditionsItemTypeParams } from "../lib/getTermsConditions";
import { termsConditionsKeys } from "./termsConditionsKeys";

export function useTermsConditions(params: GetTermsConditionsItemTypeParams) {
  return useQuery({
    queryKey: termsConditionsKeys.list(params),
    queryFn: () => getTermsConditionsItem(params),
    placeholderData: keepPreviousData,
  });
}
