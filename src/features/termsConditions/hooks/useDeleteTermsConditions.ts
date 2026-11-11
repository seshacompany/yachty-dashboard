import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTermsCondition } from "../lib/deleteTermsCondition";
import { termsConditionsKeys } from "./termsConditionsKeys";

export function useDeleteTermsConditions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTermsCondition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: termsConditionsKeys.all });
    },
  });
}
