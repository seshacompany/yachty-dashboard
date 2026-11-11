import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEmployee } from "../lib/updateEmployee";
import type { Employee } from "../types";
import { employeeKeys } from "./employeeKeys";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      oldData,
      newData,
    }: {
      id: string;
      oldData: Employee;
      newData: Partial<Employee>;
    }) => updateEmployee(id, oldData, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
    },
  });
}
