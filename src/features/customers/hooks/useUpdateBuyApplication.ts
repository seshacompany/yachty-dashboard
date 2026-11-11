import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOrder } from "../lib/updateOrderBuy";
import type { UpdateOrderType } from "../schemas/update.order";
import { buyApplicationsKeys } from "./buyApplicationsKeys";

export function useUpdateBuyApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderType }) =>
      updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: buyApplicationsKeys.all });
    },
  });
}
