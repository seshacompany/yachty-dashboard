import { useInfiniteQuery } from "@tanstack/react-query";
import { notificationApi } from "../services/notificationApi";
import { notificationKeys } from "./notificationKeys";

export function useNotifications(params: { limit?: number } = { limit: 10 }) {
  return useInfiniteQuery({
    queryKey: notificationKeys.list(params),
    queryFn: ({ pageParam = 1 }) =>
      notificationApi.getNotifications({
        page: pageParam,
        limit: params.limit,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.hasNextPage) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    refetchInterval: 5 * 60 * 1000, // Refresh automatically every 5 minutes
  });
}
