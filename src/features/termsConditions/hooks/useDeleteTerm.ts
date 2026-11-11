import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { deleteTerm } from "../services/terms.service";
import { termsKeys } from "./termsKeys";

export function useDeleteTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTerm(id),
    onSuccess: (result, id) => {
      queryClient.invalidateQueries({ queryKey: termsKeys.all });
      queryClient.removeQueries({ queryKey: termsKeys.detail(id) });
      toast.success(result?.message || "تم حذف الشرط بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء حذف الشرط"));
    },
  });
}
