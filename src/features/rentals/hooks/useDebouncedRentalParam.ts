import { useEffect, useState } from "react";
import { useRentalsFilters, type RentalFilterKey } from "./useRentalsFilters";

export function useDebouncedRentalParam(
  paramKey: RentalFilterKey,
  delayMs = 400,
) {
  const { searchParams, setFilterParam } = useRentalsFilters();
  const currentParam = searchParams.get(paramKey) || "";
  const [value, setValue] = useState(currentParam);

  useEffect(() => {
    setValue(currentParam);
  }, [currentParam]);

  useEffect(() => {
    if (value.trim() === currentParam.trim()) return;

    const timer = setTimeout(() => {
      setFilterParam(paramKey, value.trim() || undefined);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [value, currentParam, paramKey, delayMs, setFilterParam]);

  const clear = () => {
    setValue("");
    setFilterParam(paramKey, undefined);
  };

  return { value, setValue, clear };
}
