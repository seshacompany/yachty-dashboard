import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getStaff } from "../services/staff.service";
import type { StaffQueryParams } from "../types";
import { staffKeys } from "./staffKeys";

export function useGetStaff(params: StaffQueryParams = {}) {
  return useQuery({
    queryKey: staffKeys.list(params),
    queryFn: () => getStaff(params),
    placeholderData: keepPreviousData,
  });
}

