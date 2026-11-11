import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "../lib/getUsers";
import { userKeys } from "./userKeys";
import type { GetUsersParams } from "../types";

export function useUsers(params: GetUsersParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
}
