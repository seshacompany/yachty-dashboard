import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownAZ, ArrowUpAZ, RotateCcw, Search, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import type { ReviewStatus, SortOrder } from "../types";

type ReviewsFilterBarProps = {
  totalItems?: number;
};

export function ReviewsFilterBar({ totalItems }: ReviewsFilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = (searchParams.get("status") as ReviewStatus | null) || "ALL";
  const currentFeatured = searchParams.get("isFeatured") || "ALL";
  const currentSortOrder = (searchParams.get("sortOrder") as SortOrder | null) || "DESC";

  const [searchTerm, setSearchTerm] = useState(currentSearch);

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

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const updateParam = (key: string, value: string, defaultValue = "ALL") => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value && value !== defaultValue) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      next.set("page", "1");
      return next;
    });
  };

  const toggleSortOrder = () => {
    const nextOrder: SortOrder = currentSortOrder === "ASC" ? "DESC" : "ASC";
    updateParam("sortOrder", nextOrder, "DESC");
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    Boolean(currentSearch) ||
    currentStatus !== "ALL" ||
    currentFeatured !== "ALL" ||
    currentSortOrder !== "DESC";

  return (
    <div className="flex flex-col gap-4">
      {/* Top row: Search and Total count */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-sidebar/50 dark:text-white/50">
            <Search className="size-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="البحث في التعليقات أو أسماء المراجعين..."
            className="w-full rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark py-2.5 pl-4 pr-10 text-sm text-sidebar dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {totalItems !== undefined && (
          <div className="flex items-center gap-2 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3.5 py-2.5 text-xs text-secondary-light self-start sm:self-auto">
            <span>إجمالي التقييمات:</span>
            <span className="font-bold text-sidebar dark:text-white text-sm">
              {totalItems}
            </span>
          </div>
        )}
      </div>

      {/* Bottom row: Filter Selects and Action Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Select */}
        <div className="w-40 min-w-[140px]">
          <Select
            value={currentStatus}
            onValueChange={(val) => updateParam("status", val)}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="الحالة: الكل" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="ALL">جميع الحالات</SelectItem>
              <SelectItem value="PENDING">معلق (Pending)</SelectItem>
              <SelectItem value="PUBLISHED">منشور (Published)</SelectItem>
              <SelectItem value="REJECTED">مرفوض (Rejected)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Select */}
        <div className="w-36 min-w-[130px]">
          <Select
            value={currentFeatured}
            onValueChange={(val) => updateParam("isFeatured", val)}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="المحتوى المميز" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="ALL">الكل (المميز وغيره)</SelectItem>
              <SelectItem value="true">
                <span className="flex items-center gap-1">
                  <Sparkles className="size-3 text-amber-500" />
                  <span>مميز فقط</span>
                </span>
              </SelectItem>
              <SelectItem value="false">غير مميز</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order Toggle */}
        <Button
          type="button"
          variant="outline"
          onClick={toggleSortOrder}
          className="flex items-center gap-2 rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3.5 py-2 text-xs text-sidebar dark:text-white hover:bg-muted/50 cursor-pointer"
          title={currentSortOrder === "ASC" ? "الترتيب: من الأقدم للأحدث" : "الترتيب: من الأحدث للأقدم"}
        >
          {currentSortOrder === "ASC" ? (
            <ArrowUpAZ className="size-4 text-primary" />
          ) : (
            <ArrowDownAZ className="size-4 text-primary" />
          )}
          <span>{currentSortOrder === "ASC" ? "الأقدم" : "الأحدث"}</span>
        </Button>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs text-destructive hover:bg-destructive/10 cursor-pointer px-3 py-2 rounded-xl mr-auto"
          >
            <RotateCcw className="size-3.5" />
            <span>إعادة ضبط</span>
          </Button>
        )}
      </div>
    </div>
  );
}
