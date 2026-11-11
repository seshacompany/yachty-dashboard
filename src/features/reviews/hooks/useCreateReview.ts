import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCustomerFeedback } from "../lib/createCustomerFeedback";
import { reviewKeys } from "./reviewKeys";

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomerFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
}
