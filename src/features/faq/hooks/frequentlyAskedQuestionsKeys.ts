import type { GetFrequentlyAskedQuestionsParams } from "../lib/getFrequentlyAskedQuestions";

export const frequentlyAskedQuestionsKeys = {
  all: ["frequently-asked-questions"] as const,
  lists: () => [...frequentlyAskedQuestionsKeys.all, "list"] as const,
  list: (params: GetFrequentlyAskedQuestionsParams) => [...frequentlyAskedQuestionsKeys.lists(), params] as const,
  totals: () => [...frequentlyAskedQuestionsKeys.all, "total"] as const,
  total: (search: string) => [...frequentlyAskedQuestionsKeys.totals(), search] as const,
};
