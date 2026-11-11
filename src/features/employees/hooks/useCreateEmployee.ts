import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createStaff } from "../lib/createEmployee";
import { employeeKeys } from "./employeeKeys";

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
    },
  });
}
