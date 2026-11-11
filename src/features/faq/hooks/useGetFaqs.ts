import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getFaqs } from "../services/faq.service";
import { faqsKeys } from "./faqsKeys";
import type { FaqsQueryParams } from "../types";

export function useGetFaqs(params: FaqsQueryParams = {}) {
  return useQuery({
    queryKey: faqsKeys.list(params),
    queryFn: () => getFaqs(params),
    placeholderData: keepPreviousData,
  });
}
