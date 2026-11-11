import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { notificationKeys } from "./notificationKeys";

export function useReadAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.readAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
