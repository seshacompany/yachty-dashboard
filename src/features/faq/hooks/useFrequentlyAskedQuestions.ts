import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getFrequentlyAskedQuestions, type GetFrequentlyAskedQuestionsParams } from "../lib/getFrequentlyAskedQuestions";
import { frequentlyAskedQuestionsKeys } from "./frequentlyAskedQuestionsKeys";

export function useFrequentlyAskedQuestions(params: GetFrequentlyAskedQuestionsParams) {
  return useQuery({
    queryKey: frequentlyAskedQuestionsKeys.list(params),
    queryFn: () => getFrequentlyAskedQuestions(params),
    placeholderData: keepPreviousData,
  });
}
