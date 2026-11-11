import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getEmployees, type GetEmployeesParams } from "../lib/getEmployees";
import { employeeKeys } from "./employeeKeys";

export function useEmployees(params: GetEmployeesParams) {
  return useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () => getEmployees(params),
    placeholderData: keepPreviousData,
  });
}
