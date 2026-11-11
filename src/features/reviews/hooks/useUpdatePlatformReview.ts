import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { updatePlatformReview } from "../services/reviews.service";
import { reviewsKeys } from "./reviewsKeys";
import type { UpdateReviewPayload } from "../types";

type UpdateReviewVariables = {
  id: string;
  payload: UpdateReviewPayload;
};

export function useUpdatePlatformReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateReviewVariables) =>
      updatePlatformReview(id, payload),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.all });
      queryClient.invalidateQueries({
        queryKey: reviewsKeys.detail(variables.id),
      });
      toast.success(result?.message || "تم تحديث التقييم بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء تحديث التقييم"));
    },
  });
}

// Aliases for backwards compatibility
export const useUpdateReview = useUpdatePlatformReview;
