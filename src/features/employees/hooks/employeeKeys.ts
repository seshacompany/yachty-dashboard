import type { GetEmployeesParams } from "../lib/getEmployees";

export const employeeKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (params: GetEmployeesParams) =>
    [...employeeKeys.lists(), params] as const,
  filterProperties: () => [...employeeKeys.all, "filter-properties"] as const,
};
