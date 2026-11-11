import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getTotalFrequentlyAskedQuestions } from "../lib/getTotalFrequentlyAskedQuestions";
import { frequentlyAskedQuestionsKeys } from "./frequentlyAskedQuestionsKeys";

export function useTotalFrequentlyAskedQuestions(search: string) {
  return useQuery({
    queryKey: frequentlyAskedQuestionsKeys.total(search),
    queryFn: () => getTotalFrequentlyAskedQuestions(search),
    placeholderData: keepPreviousData,
  });
}
