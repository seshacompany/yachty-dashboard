import { useQuery } from "@tanstack/react-query";

import { getFilterProperties } from "../lib/getFilterProperties";
import { employeeKeys } from "./employeeKeys";

export function useFilterProperties() {
  return useQuery({
    queryKey: employeeKeys.filterProperties(),
    queryFn: getFilterProperties,
    staleTime: 5 * 60 * 1000,
  });
}
