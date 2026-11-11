import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTickets } from "../services/messages.service";
import { ticketsKeys } from "./ticketsKeys";
import type { MessagesQueryParams } from "../types";

export function useGetTickets(params: MessagesQueryParams = {}) {
  return useQuery({
    queryKey: ticketsKeys.list(params),
    queryFn: () => getTickets(params),
    placeholderData: keepPreviousData,
  });
}
