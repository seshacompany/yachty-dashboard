import { getApiErrorMessage } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateStaff } from "../services/staff.service";
import type { UpdateStaffPayload } from "../types";
import { staffKeys } from "./staffKeys";

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateStaffPayload;
    }) => updateStaff(id, payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
      toast.success(result?.message || "تم تحديث بيانات الموظف بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء تحديث بيانات الموظف"));
    },
  });
}

