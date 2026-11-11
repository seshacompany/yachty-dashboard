import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  FilterX,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import type { SortOrder, StaffStatus } from "../types/staff.types";

export type FilterStatus = StaffStatus | "ALL";

interface StaffFilterBarProps {
  onAddNew: () => void;
  totalItems?: number;
}

export function StaffFilterBar({ onAddNew, totalItems }: StaffFilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = (searchParams.get("status") as FilterStatus) || "ALL";
  const currentJobTitle = searchParams.get("jobTitle") || "";
  const currentSortOrder = (searchParams.get("sortOrder") as SortOrder) || "DESC";

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [jobTitleTerm, setJobTitleTerm] = useState(currentJobTitle);

  // Debounced search sync
  useEffect(() => {
    if (searchTerm.trim() === currentSearch.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = searchTerm.trim();
        if (trimmed) {
          next.set("search", trimmed);
        } else {
          next.delete("search");
        }
        next.set("page", "1");
        return next;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, currentSearch, setSearchParams]);

  // Debounced jobTitle sync
  useEffect(() => {
    if (jobTitleTerm.trim() === currentJobTitle.trim()) return;

    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = jobTitleTerm.trim();
        if (trimmed) {
          next.set("jobTitle", trimmed);
        } else {
          next.delete("jobTitle");
        }
        next.set("page", "1");
        return next;
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [jobTitleTerm, currentJobTitle, setSearchParams]);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    setJobTitleTerm(currentJobTitle);
  }, [currentJobTitle]);

  const handleStatusChange = (val: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (val && val !== "ALL") {
        next.set("status", val);
      } else {
        next.delete("status");
      }
      next.set("page", "1");
      return next;
    });
  };

  const toggleSortOrder = () => {
    const nextOrder: SortOrder = currentSortOrder === "ASC" ? "DESC" : "ASC";
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortOrder", nextOrder);
      next.set("page", "1");
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setJobTitleTerm("");
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("search");
      next.delete("status");
      next.delete("jobTitle");
      next.set("sortOrder", "DESC");
      next.set("page", "1");
      return next;
    });
  };

  const hasActiveFilters = Boolean(
    currentSearch ||
      (currentStatus && currentStatus !== "ALL") ||
      currentJobTitle ||
      currentSortOrder !== "DESC"
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Top Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search by Name or Email */}
        <div className="relative flex-1 min-w-[220px]">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-sidebar/50 dark:text-white/50">
            <Search className="size-4" />
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث بالاسم أو البريد الإلكتروني..."
            className="w-full rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark py-2.5 pl-4 pr-10 text-sm text-sidebar dark:text-white"
          />
        </div>

        {/* Job Title Filter */}
        <div className="w-full lg:w-56">
          <Input
            type="text"
            value={jobTitleTerm}
            onChange={(e) => setJobTitleTerm(e.target.value)}
            placeholder="تصفية حسب المسمى الوظيفي..."
            className="w-full rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark py-2.5 px-4 text-sm text-sidebar dark:text-white"
          />
        </div>

        {/* Status Dropdown */}
        <div className="w-full lg:w-44">
          <Select
            value={currentStatus}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-full rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark text-sm">
              <SelectValue placeholder="حالة الحساب" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="ALL">جميع الحالات</SelectItem>
              <SelectItem value="ACTIVE">نشط (ACTIVE)</SelectItem>
              <SelectItem value="PENDING">معلق (PENDING)</SelectItem>
              <SelectItem value="SUSPENDED">موقوف (SUSPENDED)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons: Sort, Reset, Add New */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Sort Toggle */}
          <Button
            type="button"
            variant="outline"
            onClick={toggleSortOrder}
            className="flex items-center gap-2 rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3 py-2 text-sm text-sidebar dark:text-white hover:bg-muted/50 cursor-pointer"
            title={
              currentSortOrder === "ASC"
                ? "الترتيب: من الأقدم للأحدث"
                : "الترتيب: من الأحدث للأقدم"
            }
          >
            {currentSortOrder === "ASC" ? (
              <ArrowUpAZ className="size-4 text-primary" />
            ) : (
              <ArrowDownAZ className="size-4 text-primary" />
            )}
            <span className="text-xs">
              {currentSortOrder === "ASC" ? "تصاعدي" : "تنازلي"}
            </span>
          </Button>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3 py-2 text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
              title="إعادة ضبط الفلاتر"
            >
              <FilterX className="size-3.5" />
              <span>إعادة ضبط</span>
            </Button>
          )}

          {/* Total Items Badge */}
          {totalItems !== undefined && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3 py-2 text-xs text-sidebar/70 dark:text-white/70">
              <span>الإجمالي:</span>
              <span className="font-bold text-sidebar dark:text-white">
                {totalItems}
              </span>
            </div>
          )}

          {/* Add Staff Button */}
          <Button
            type="button"
            onClick={onAddNew}
            className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 cursor-pointer shadow-xs"
          >
            <Plus className="size-4" />
            <span>إضافة موظف</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
