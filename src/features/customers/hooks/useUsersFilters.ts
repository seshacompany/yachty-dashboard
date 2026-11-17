import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { GetUsersParams, UserRole, UserStatus } from "../types";

const FILTER_KEYS = ["email", "phone", "role", "status", "fromDate", "toDate"] as const;
export type UserFilterKey = (typeof FILTER_KEYS)[number];

export function useUsersFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams: GetUsersParams = useMemo(
    () => ({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      email: searchParams.get("email") || undefined,
      phone: searchParams.get("phone") || undefined,
      role: (searchParams.get("role") as UserRole) || undefined,
      status: (searchParams.get("status") as UserStatus) || undefined,
      fromDate: searchParams.get("fromDate") || undefined,
      toDate: searchParams.get("toDate") || undefined,
    }),
    [searchParams],
  );

  const hasActiveFilters = FILTER_KEYS.some((key) => searchParams.has(key));

  const setFilterParam = useCallback(
    (key: UserFilterKey, value: string | undefined) => {
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
