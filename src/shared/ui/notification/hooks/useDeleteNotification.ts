import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { notificationKeys } from "./notificationKeys";

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.deleteOne(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
