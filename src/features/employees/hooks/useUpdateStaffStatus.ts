import { getApiErrorMessage } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateStaffStatus } from "../services/staff.service";
import type { StaffStatus } from "../types";
import { staffKeys } from "./staffKeys";

export function useUpdateStaffStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: StaffStatus }) =>
      updateStaffStatus(id, { status }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
      toast.success(result?.message || "تم تحديث حالة الموظف بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء تحديث حالة الموظف"));
    },
  });
}
