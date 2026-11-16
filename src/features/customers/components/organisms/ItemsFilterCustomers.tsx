import { RotateCcw } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { roleOptions, statusOptions } from "../../data/tableData";
import { SelectFilter } from "../atoms/SelectFilter";

type ItemsFilterCustomersProps = {
  show: boolean;
};

export function ItemsFilterCustomers({ show }: ItemsFilterCustomersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";

  const hasActiveFilters =
    searchParams.has("email") ||
    searchParams.has("phone") ||
    searchParams.has("role") ||
    searchParams.has("status") ||
    searchParams.has("fromDate") ||
    searchParams.has("toDate");

  const handleDateChange = (key: "fromDate" | "toDate", value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set("page", "1");
      return params;
    });
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("email");
    params.delete("phone");
    params.delete("role");
    params.delete("status");
    params.delete("fromDate");
    params.delete("toDate");
    params.set("page", "1");
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
            className="flex items-center gap-1.5 text-xs text-destructive hover:underline cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>إعادة ضبط الفلاتر</span>
          </button>
        )}
      </div>

      <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">نوع المستخدم</Label>
          <SelectFilter
            label="الكل (نوع المستخدم)"
            name="role"
            options={roleOptions}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">الحالة</Label>
          <SelectFilter
            label="الكل (الحالة)"
            name="status"
            options={statusOptions}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fromDate" className="text-xs text-muted-foreground">
            من تاريخ التسجيل
          </Label>
          <Input
            id="fromDate"
            type="date"
            value={fromDate}
            onChange={(e) => handleDateChange("fromDate", e.target.value)}
            className="w-full bg-white dark:bg-popover-dark text-sidebar dark:text-white border-sidebar/20 dark:border-white/15"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="toDate" className="text-xs text-muted-foreground">
            إلى تاريخ التسجيل
          </Label>
          <Input
            id="toDate"
            type="date"
            value={toDate}
            onChange={(e) => handleDateChange("toDate", e.target.value)}
            className="w-full bg-white dark:bg-popover-dark text-sidebar dark:text-white border-sidebar/20 dark:border-white/15"
          />
        </div>
      </div>
    </div>
  );
}
