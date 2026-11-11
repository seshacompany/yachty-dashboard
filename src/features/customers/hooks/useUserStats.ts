import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "../lib/getUserStats";
import { userKeys } from "./userKeys";

export function useUserStats() {
  return useQuery({
    queryKey: userKeys.stats(),
    queryFn: getUserStats,
  });
}
