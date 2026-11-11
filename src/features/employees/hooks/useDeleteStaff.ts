import { getApiErrorMessage } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteStaff } from "../services/staff.service";
import { staffKeys } from "./staffKeys";

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteStaff(id),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: staffKeys.all });
      toast.success(result?.message || "تم حذف الموظف بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "حدث خطأ أثناء حذف الموظف"));
    },
  });
}

