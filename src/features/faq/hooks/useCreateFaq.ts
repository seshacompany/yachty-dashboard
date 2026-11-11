import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { createFaq } from "../services/faq.service";
import { faqsKeys } from "./faqsKeys";
import type { CreateFaqPayload } from "../types";

export function useCreateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateFaqPayload) => createFaq(payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: faqsKeys.all });
      toast.success(result?.message || "تمت إضافة السؤال بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء إضافة السؤال"));
    },
  });
}
