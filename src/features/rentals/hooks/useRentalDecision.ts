import { getApiErrorMessage } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateRentalDecision } from "../services/rentals.service";
import { rentalKeys } from "./rentalKeys";
import type { RentalDecisionPayload } from "../types";

export function useRentalDecision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RentalDecisionPayload;
    }) => updateRentalDecision(id, payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: rentalKeys.all });
      toast.success(result?.message || "تم تحديث حالة المركب بنجاح");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err, "تعذر تحديث حالة المركب"));
    },
  });
}
