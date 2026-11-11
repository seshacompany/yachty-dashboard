import type { GetBuyApplicationsParams } from "../lib/getBuyApplications";

export const buyApplicationsKeys = {
  all: ["buy-applications"] as const,
  lists: () => [...buyApplicationsKeys.all, "list"] as const,
  list: (params: GetBuyApplicationsParams) =>
    [...buyApplicationsKeys.lists(), params] as const,
};
