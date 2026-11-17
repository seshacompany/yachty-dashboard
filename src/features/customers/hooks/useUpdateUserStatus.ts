import { getApiErrorMessage } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserStatus } from "../services/users.service";
import { userKeys } from "./userKeys";
import type { UpdateUserStatusRequest } from "../types";

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateUserStatusRequest;
    }) => updateUserStatus(id, payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success(result?.message || "تم تغيير حالة المستخدم بنجاح");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "تعذر تغيير حالة المستخدم"));
    },
  });
}
