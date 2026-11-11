import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { notificationKeys } from "./notificationKeys";

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.readOne(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
