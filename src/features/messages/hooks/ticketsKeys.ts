import type { MessagesQueryParams } from "../types";

export const ticketsKeys = {
  all: ["support-tickets"] as const,
  lists: () => [...ticketsKeys.all, "list"] as const,
  list: (params: MessagesQueryParams = {}) =>
    [...ticketsKeys.lists(), params] as const,
  details: () => [...ticketsKeys.all, "detail"] as const,
  detail: (id: string) => [...ticketsKeys.details(), id] as const,
};
