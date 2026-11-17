import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { GetRentalsParams, RentalStatus } from "../types";

const FILTER_KEYS = ["brand", "location", "status"] as const;
export type RentalFilterKey = (typeof FILTER_KEYS)[number];

export function useRentalsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams: GetRentalsParams = useMemo(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      brand: searchParams.get("brand") || undefined,
      location: searchParams.get("location") || undefined,
      status: (searchParams.get("status") as RentalStatus) || undefined,
    }),
    [searchParams],
  );

  const hasActiveFilters = FILTER_KEYS.some((key) => searchParams.has(key));

  const setFilterParam = useCallback(
    (key: RentalFilterKey, value: string | undefined) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== "all") {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        next.set("page", "1");
        return next;
      });
    },
    [setSearchParams],
  );

  const setPage = useCallback(
    (newPage: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(newPage));
        return next;
      });
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      for (const key of FILTER_KEYS) {
        next.delete(key);
      }
      next.set("page", "1");
      return next;
    });
  }, [setSearchParams]);

  return {
    queryParams,
    searchParams,
    hasActiveFilters,
    setFilterParam,
    setPage,
    resetFilters,
  };
}
