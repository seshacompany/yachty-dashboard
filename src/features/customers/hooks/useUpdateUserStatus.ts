import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../lib/updateUserStatus";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
}
