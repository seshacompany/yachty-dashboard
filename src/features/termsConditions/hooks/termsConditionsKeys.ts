import type { GetTermsConditionsItemTypeParams } from "../lib/getTermsConditions";

export const termsConditionsKeys = {
  all: ["terms-and-conditions"] as const,
  lists: () => [...termsConditionsKeys.all, "list"] as const,
  list: (params: GetTermsConditionsItemTypeParams) => [...termsConditionsKeys.lists(), params] as const,
  totals: () => [...termsConditionsKeys.all, "total"] as const,
  total: (search: string) => [...termsConditionsKeys.totals(), search] as const,
};
