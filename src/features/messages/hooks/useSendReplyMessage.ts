import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/axios";
import { sendReplyMessage } from "../services/messages.service";
import { ticketsKeys } from "./ticketsKeys";
import type { SendMessagePayload } from "../types";

type SendReplyVariables = {
  id: string;
  payload: SendMessagePayload;
};

export function useSendReplyMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: SendReplyVariables) =>
      sendReplyMessage(id, payload),
    onSuccess: (result, variables) => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys.all });
      queryClient.invalidateQueries({
        queryKey: ticketsKeys.detail(variables.id),
      });
      toast.success(result?.message || "تم إرسال الرد بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء إرسال الرد"));
    },
  });
}
