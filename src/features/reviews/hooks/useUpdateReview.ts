import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateReview } from "../lib/updateReview";
import type { UpdateReviewType } from "../schemas/edit.review";
import { reviewKeys } from "./reviewKeys";

export function useUpdateReview(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateReviewType) => updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
}
