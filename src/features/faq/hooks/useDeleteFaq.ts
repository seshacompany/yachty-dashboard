import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { deleteFaq } from "../services/faq.service";
import { faqsKeys } from "./faqsKeys";

export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: (result, id) => {
      queryClient.invalidateQueries({ queryKey: faqsKeys.all });
      queryClient.removeQueries({ queryKey: faqsKeys.detail(id) });
      toast.success(result?.message || "تم حذف السؤال بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء حذف السؤال"));
    },
  });
}
