import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketsKeys } from "./ticketsKeys";

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: string) => {
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys.all });
    },
  });
}
