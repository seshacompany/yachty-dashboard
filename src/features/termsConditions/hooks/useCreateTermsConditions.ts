import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTermsConditions } from "../lib/createTermsConditions";
import { termsConditionsKeys } from "./termsConditionsKeys";

export function useCreateTermsConditions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTermsConditions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: termsConditionsKeys.all });
    },
  });
}
