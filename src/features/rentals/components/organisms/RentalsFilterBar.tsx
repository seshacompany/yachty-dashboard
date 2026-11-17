import { MapPin, RotateCcw, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { rentalStatusOptions } from "../../data/tableData";
import { useRentalsFilters } from "../../hooks/useRentalsFilters";
import { DebouncedRentalInput } from "../atoms/DebouncedRentalInput";

type RentalsFilterBarProps = {
  totalCount?: number;
};

export function RentalsFilterBar({ totalCount }: RentalsFilterBarProps) {
  const { searchParams, hasActiveFilters, setFilterParam, resetFilters } =
    useRentalsFilters();

  const currentStatus = searchParams.get("status") || "all";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-navy dark:text-coastal-white shrink-0">
          إدارة المراكب المعروضة للإيجار
          {totalCount !== undefined ? ` (${totalCount})` : ""}
        </h2>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs text-destructive hover:underline cursor-pointer self-start md:self-auto"
          >
            <RotateCcw size={13} />
            <span>إعادة ضبط الفلاتر</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <DebouncedRentalInput
          paramKey="brand"
          placeholder="البحث بالماركة (Brand)..."
          icon={Search}
        />

        <DebouncedRentalInput
          paramKey="location"
          placeholder="البحث بالموقع (Location)..."
          icon={MapPin}
        />

        <Select
          value={currentStatus}
          onValueChange={(value) => setFilterParam("status", value)}
        >
          <SelectTrigger className="w-full bg-white dark:bg-card-dark text-sidebar dark:text-white border-sidebar/20 dark:border-white/20">
            <SelectValue placeholder="جميع الحالات" />
          </SelectTrigger>
          <SelectContent
            dir="rtl"
            className="bg-popover dark:bg-card-dark text-sidebar dark:text-white"
          >
            <SelectItem value="all">جميع الحالات</SelectItem>
            {rentalStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
