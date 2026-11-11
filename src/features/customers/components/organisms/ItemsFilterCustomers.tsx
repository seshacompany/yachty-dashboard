import { RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  roleOptions,
  sortOrderOptions,
  statusOptions,
} from "../../data/tableData";
import { SelectFilter } from "../atoms/SelectFilter";

type ItemsFilterCustomersProps = {
  show: boolean;
};

export function ItemsFilterCustomers({ show }: ItemsFilterCustomersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasActiveFilters =
    searchParams.has("role") ||
    searchParams.has("status") ||
    searchParams.has("sortBy") ||
    searchParams.has("sortOrder");

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("role");
    params.delete("status");
    params.delete("sortBy");
    params.delete("sortOrder");
    params.delete("page");
    setSearchParams(params);
  };

  if (!show) return null;

  return (
    <div className="flex flex-col gap-3 p-4 bg-muted/40 dark:bg-popover-dark/40 rounded-xl border border-sidebar/20 dark:border-white/10">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-sidebar dark:text-white/80">
          تصفية المستخدمين
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs text-destructive hover:underline cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>إعادة ضبط الفلاتر</span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <SelectFilter
          label="نوع المستخدم"
          name="role"
          options={roleOptions}
        />
        <SelectFilter
          label="الحالة"
          name="status"
          options={statusOptions}
        />
        <SelectFilter
          label="ترتيب النتائج"
          name="sortOrder"
          options={sortOrderOptions}
        />
      </div>
    </div>
  );
}
