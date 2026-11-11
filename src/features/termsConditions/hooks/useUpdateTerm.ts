import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { updateTerm } from "../services/terms.service";
import { termsKeys } from "./termsKeys";
import type { UpdateTermPayload } from "../types";

type UpdateTermVariables = {
  id: string;
  payload: UpdateTermPayload;
};

export function useUpdateTerm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateTermVariables) =>
      updateTerm(id, payload),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: termsKeys.all });
      queryClient.invalidateQueries({
        queryKey: termsKeys.detail(variables.id),
      });
      toast.success(result?.message || "تم تعديل الشرط بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء تعديل الشرط"));
    },
  });
}
