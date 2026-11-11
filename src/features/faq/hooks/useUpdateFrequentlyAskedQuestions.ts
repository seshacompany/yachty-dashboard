import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFrequentlyAskedQuestions } from "../lib/updateFrequentlyAskedQuestions";
import type { UpdateFrequentlyAskedQuestionsType } from "../schemas/edit.FrequentlyAskedQuestions";
import { frequentlyAskedQuestionsKeys } from "./frequentlyAskedQuestionsKeys";

export function useUpdateFrequentlyAskedQuestions(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateFrequentlyAskedQuestionsType) => updateFrequentlyAskedQuestions(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentlyAskedQuestionsKeys.all });
    },
  });
}
