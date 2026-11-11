import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { notificationKeys } from "./notificationKeys";

export function useClearAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.clearAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
