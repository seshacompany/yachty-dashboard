import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRentals } from "../services/rentals.service";
import { rentalKeys } from "./rentalKeys";
import type { GetRentalsParams } from "../types";

export function useRentals(params: GetRentalsParams) {
  return useQuery({
    queryKey: rentalKeys.list(params),
    queryFn: () => getRentals(params),
    placeholderData: keepPreviousData,
  });
}
