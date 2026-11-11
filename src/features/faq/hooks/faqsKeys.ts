import type { FaqsQueryParams } from "../types";

export const faqsKeys = {
  all: ["faqs"] as const,
  lists: () => [...faqsKeys.all, "list"] as const,
  list: (params: FaqsQueryParams = {}) =>
    [...faqsKeys.lists(), params] as const,
  details: () => [...faqsKeys.all, "detail"] as const,
  detail: (id: string) => [...faqsKeys.details(), id] as const,
};
