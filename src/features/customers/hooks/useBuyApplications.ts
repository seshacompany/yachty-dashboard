import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getBuyApplications,
  type GetBuyApplicationsParams,
} from "../lib/getBuyApplications";

import { buyApplicationsKeys } from "./buyApplicationsKeys";

export function useBuyApplications(params: GetBuyApplicationsParams) {
  return useQuery({
    queryKey: buyApplicationsKeys.list(params),
    queryFn: () => getBuyApplications(params),
    placeholderData: keepPreviousData,
  });
}
