import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCustomerFeedback } from "../lib/deleteCustomerFeedback";
import { frequentlyAskedQuestionsKeys } from "./frequentlyAskedQuestionsKeys";

export function useDeleteFrequentlyAskedQuestions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomerFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: frequentlyAskedQuestionsKeys.all });
    },
  });
}
