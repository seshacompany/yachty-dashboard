import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFrequentlyAskedQuestions } from "../lib/createFrequentlyAskedQuestions";
import { frequentlyAskedQuestionsKeys } from "./frequentlyAskedQuestionsKeys";

export function useCreateFrequentlyAskedQuestions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createFrequentlyAskedQuestions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentlyAskedQuestionsKeys.all });
    },
  });
}
