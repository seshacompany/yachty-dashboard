import { getApiErrorMessage } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createStaff } from "../services/staff.service";
import type { CreateStaffPayload } from "../types";
import { staffKeys } from "./staffKeys";

export function useCreateStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateStaffPayload) => createStaff(payload),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
      toast.success(result?.message || "تمت إضافة الموظف بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء إضافة الموظف"));
    },
  });
}

