import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { updateTicketStatus } from "../services/messages.service";
import { ticketsKeys } from "./ticketsKeys";
import type { UpdateStatusPayload } from "../types";

type UpdateStatusVariables = {
  id: string;
  payload: UpdateStatusPayload;
};

export function useUpdateTicketStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateStatusVariables) =>
      updateTicketStatus(id, payload),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys.all });
      queryClient.invalidateQueries({
        queryKey: ticketsKeys.detail(variables.id),
      });
      toast.success(result?.message || "تم تحديث حالة التذكرة بنجاح");
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "حدث خطأ أثناء تحديث حالة التذكرة")
      );
    },
  });
}
