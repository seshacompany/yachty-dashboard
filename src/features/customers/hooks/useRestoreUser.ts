import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreUser } from "../lib/restoreUser";
import { userKeys } from "./userKeys";

export function useRestoreUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restoreUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}
