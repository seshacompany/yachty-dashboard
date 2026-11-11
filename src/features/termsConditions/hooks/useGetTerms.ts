import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTerms } from "../services/terms.service";
import { termsKeys } from "./termsKeys";
import type { TermsQueryParams } from "../types";

export function useGetTerms(params: TermsQueryParams = {}) {
  return useQuery({
    queryKey: termsKeys.list(params),
    queryFn: () => getTerms(params),
    placeholderData: keepPreviousData,
  });
}
