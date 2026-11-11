import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { createTerm } from "../services/terms.service";
import { termsKeys } from "./termsKeys";
import type { CreateTermPayload } from "../types";

export function useCreateTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTermPayload) => createTerm(payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: termsKeys.all });
      toast.success(result?.message || "تمت إضافة الشرط بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء إضافة الشرط"));
    },
  });
}
