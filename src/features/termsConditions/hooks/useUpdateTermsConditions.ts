import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTermsConditions } from "../lib/updateTermsConditions";
import type { UpdateTermsConditionsType } from "../schemas/edit.TermsConditions";
import { termsConditionsKeys } from "./termsConditionsKeys";

export function useUpdateTermsConditions(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTermsConditionsType) => updateTermsConditions(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: termsConditionsKeys.all });
    },
  });
}
