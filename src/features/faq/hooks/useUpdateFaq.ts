import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { updateFaq } from "../services/faq.service";
import { faqsKeys } from "./faqsKeys";
import type { UpdateFaqPayload } from "../types";

type UpdateFaqVariables = {
  id: string;
  payload: UpdateFaqPayload;
};

export function useUpdateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateFaqVariables) =>
      updateFaq(id, payload),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: faqsKeys.all });
      queryClient.invalidateQueries({
        queryKey: faqsKeys.detail(variables.id),
      });
      toast.success(result?.message || "تم تعديل السؤال بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء تعديل السؤال"));
    },
  });
}
