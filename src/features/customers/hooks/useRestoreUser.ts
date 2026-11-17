import { getApiErrorMessage } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { restoreUser } from "../services/users.service";
import { userKeys } from "./userKeys";

export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restoreUser(id),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toast.success(result?.message || "تم استعادة المستخدم بنجاح");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "تعذر استعادة المستخدم"));
    },
  });
}
