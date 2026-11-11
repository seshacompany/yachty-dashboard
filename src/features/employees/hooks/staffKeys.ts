import type { StaffQueryParams } from "../types";

export const staffKeys = {
  all: ["staff-list"] as const,
  lists: () => [...staffKeys.all, "list"] as const,
  list: (params: StaffQueryParams = {}) => [...staffKeys.lists(), params] as const,
  details: () => [...staffKeys.all, "detail"] as const,
  detail: (id: string) => [...staffKeys.details(), id] as const,
  me: () => [...staffKeys.all, "me"] as const,
};

