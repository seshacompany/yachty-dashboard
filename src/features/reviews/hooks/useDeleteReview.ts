import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCustomerFeedback } from "../lib/deleteCustomerFeedback";
import { reviewKeys } from "./reviewKeys";

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomerFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
}
