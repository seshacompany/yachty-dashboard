import type { TermsQueryParams } from "../types";

export const termsKeys = {
  all: ["terms"] as const,
  lists: () => [...termsKeys.all, "list"] as const,
  list: (params: TermsQueryParams = {}) =>
    [...termsKeys.lists(), params] as const,
  details: () => [...termsKeys.all, "detail"] as const,
  detail: (id: string) => [...termsKeys.details(), id] as const,
};
