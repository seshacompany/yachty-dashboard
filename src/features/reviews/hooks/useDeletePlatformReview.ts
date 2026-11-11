import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { deletePlatformReview } from "../services/reviews.service";
import { reviewsKeys } from "./reviewsKeys";

export function useDeletePlatformReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePlatformReview(id),
    onSuccess: (result, id) => {
      queryClient.invalidateQueries({ queryKey: reviewsKeys.all });
      queryClient.removeQueries({ queryKey: reviewsKeys.detail(id) });
      toast.success(result?.message || "تم حذف التقييم بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء حذف التقييم"));
    },
  });
}

// Aliases for backwards compatibility
export const useDeleteReview = useDeletePlatformReview;
