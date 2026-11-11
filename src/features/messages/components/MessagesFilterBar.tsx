import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownAZ, ArrowUpAZ, RotateCcw, Search } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

type MessagesFilterBarProps = {
  totalItems?: number;
};

const STATUS_OPTIONS = [
  { value: "ALL", label: "جميع الحالات" },
  { value: "OPEN", label: "مفتوحة" },
  { value: "IN_PROGRESS", label: "قيد المعالجة" },
  { value: "RESOLVED", label: "تم الحل" },
  { value: "CLOSED", label: "مغلقة" },
];

const CATEGORY_OPTIONS = [
  { value: "ALL", label: "جميع الأقسام" },
  { value: "ACCOUNT", label: "الحساب" },
  { value: "PROPERTY", label: "العقارات" },
  { value: "PAYMENT", label: "المدفوعات" },
  { value: "SUBSCRIPTION", label: "الاشتراكات" },
  { value: "TECHNICAL", label: "مشكلة تقنية" },
  { value: "COMPLAINT", label: "شكوى" },
  { value: "OTHER", label: "أخرى" },
];

const PRIORITY_OPTIONS = [
  { value: "ALL", label: "جميع الأولويات" },
  { value: "LOW", label: "منخفضة" },
  { value: "MEDIUM", label: "متوسطة" },
  { value: "HIGH", label: "عالية" },
  { value: "URGENT", label: "عاجلة" },
];

export function MessagesFilterBar({ totalItems }: MessagesFilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "ALL";
  const currentCategory = searchParams.get("category") || "ALL";
  const currentPriority = searchParams.get("priority") || "ALL";
  const sortParamValue = (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC";

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Debounced search sync
  useEffect(() => {
    if (searchTerm.trim() === currentSearch.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = searchTerm.trim();
        if (trimmed) next.set("search", trimmed);
        else next.delete("search");
        next.set("page", "1");
        return next;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, setSearchParams]);

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const updateParam = (key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== "ALL") next.set(key, value);
      else next.delete(key);
      next.set("page", "1");
      return next;
    });
  };

  const toggleSortOrder = () => {
    const nextOrder = sortParamValue === "ASC" ? "DESC" : "ASC";
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortOrder", nextOrder);
      next.set("page", "1");
      return next;
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    Boolean(currentSearch) ||
    currentStatus !== "ALL" ||
    currentCategory !== "ALL" ||
    currentPriority !== "ALL" ||
    sortParamValue === "ASC";

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {/* Search Input */}
        <div className="relative col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 dark:text-white/50">
            <Search className="size-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث بالاسم، البريد، الهاتف، رقم التذكرة أو الموضوع..."
            className="w-full rounded-xl border border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark py-2.5 pl-4 pr-10 text-sm text-sidebar dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-colors"
          />
        </div>

        {/* Status Select */}
        <Select
          value={currentStatus}
          onValueChange={(val) => updateParam("status", val)}
        >
          <SelectTrigger className="w-full rounded-xl border border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark text-sm text-sidebar dark:text-white shadow-xs">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent align="end" className="bg-white dark:bg-card-dark border border-sidebar/20 dark:border-white/10 shadow-lg">
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Select */}
        <Select
          value={currentCategory}
          onValueChange={(val) => updateParam("category", val)}
        >
          <SelectTrigger className="w-full rounded-xl border border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark text-sm text-sidebar dark:text-white shadow-xs">
            <SelectValue placeholder="القسم" />
          </SelectTrigger>
          <SelectContent align="end" className="bg-white dark:bg-card-dark border border-sidebar/20 dark:border-white/10 shadow-lg">
            {CATEGORY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Priority Select */}
        <Select
          value={currentPriority}
          onValueChange={(val) => updateParam("priority", val)}
        >
          <SelectTrigger className="w-full rounded-xl border border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark text-sm text-sidebar dark:text-white shadow-xs">
            <SelectValue placeholder="الأولوية" />
          </SelectTrigger>
          <SelectContent align="end" className="bg-white dark:bg-card-dark border border-sidebar/20 dark:border-white/10 shadow-lg">
            {PRIORITY_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Secondary Row: Controls & Counters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          {/* Sort Button */}
          <Button
            type="button"
            variant="outline"
            onClick={toggleSortOrder}
            className="flex items-center gap-2 rounded-xl border border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark px-3.5 py-2 text-xs font-medium text-sidebar dark:text-white hover:bg-slate-50 dark:hover:bg-popover-dark/50 shadow-xs cursor-pointer transition-colors"
          >
            {sortParamValue === "ASC" ? (
              <ArrowUpAZ className="size-3.5 text-primary" />
            ) : (
              <ArrowDownAZ className="size-3.5 text-primary" />
            )}
            <span>{sortParamValue === "ASC" ? "الأقدم أولاً" : "الأحدث أولاً"}</span>
          </Button>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:text-rose-300 dark:hover:bg-rose-500/10 cursor-pointer transition-colors"
            >
              <RotateCcw className="size-3.5" />
              <span>إعادة ضبط الفلاتر</span>
            </Button>
          )}
        </div>

        {totalItems !== undefined && (
          <div className="flex items-center gap-1.5 rounded-xl border border-sidebar/20 dark:border-white/10 bg-white dark:bg-card-dark px-3 py-1.5 text-xs text-secondary-light shadow-xs">
            <span>إجمالي التذاكر:</span>
            <span className="font-bold text-sidebar dark:text-white">
              {totalItems}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
