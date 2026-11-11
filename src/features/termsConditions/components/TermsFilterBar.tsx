import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDownAZ, ArrowUpAZ, Plus, Search } from "lucide-react";
import { Button } from "@/shared/ui/button";

type TermsFilterBarProps = {
  onAddNew: () => void;
  totalItems?: number;
};

export function TermsFilterBar({ onAddNew, totalItems }: TermsFilterBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const sortParamValue = (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC";

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  // Sync debounced search with URL searchParams ONLY when searchTerm differs from URL
  useEffect(() => {
    if (searchTerm.trim() === currentSearch.trim()) {
      return;
    }

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

  // Keep local search term in sync if URL changes externally
  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const toggleSortOrder = () => {
    const nextOrder = sortParamValue === "ASC" ? "DESC" : "ASC";
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortOrder", nextOrder);
      next.set("page", "1");
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-sidebar/50 dark:text-white/50">
          <Search className="size-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="البحث في الشروط والأحكام..."
          className="w-full rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark py-2.5 pl-4 pr-10 text-sm text-sidebar dark:text-white placeholder:text-sidebar/50 dark:placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Action Controls: Sort, Total Count, Add New */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort Toggle Button */}
        <Button
          type="button"
          variant="outline"
          onClick={toggleSortOrder}
          className="flex items-center gap-2 rounded-xl border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3.5 py-2 text-sm text-sidebar dark:text-white hover:bg-muted/50 cursor-pointer"
          title={sortParamValue === "ASC" ? "الترتيب: من الأقدم للأحدث" : "الترتيب: من الأحدث للأقدم"}
        >
          {sortParamValue === "ASC" ? (
            <ArrowUpAZ className="size-4 text-primary" />
          ) : (
            <ArrowDownAZ className="size-4 text-primary" />
          )}
          <span className="text-xs">
            {sortParamValue === "ASC" ? "تصاعدي" : "تنازلي"}
          </span>
        </Button>

        {/* Total Count Badge if available */}
        {totalItems !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark px-3 py-2 text-xs text-secondary-light">
            <span>الإجمالي:</span>
            <span className="font-bold text-sidebar dark:text-white">
              {totalItems}
            </span>
          </div>
        )}

        {/* Add New Button */}
        <Button
          type="button"
          onClick={onAddNew}
          className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 cursor-pointer shadow-xs"
        >
          <Plus className="size-4" />
          <span>إضافة شرط جديد</span>
        </Button>
      </div>
    </div>
  );
}
