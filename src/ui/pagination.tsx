import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center py-2", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1.5 sm:gap-2", className)}
      {...props}
    />
  );
}

export function PaginationItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={cn("list-none", className)} {...props} />;
}

type PaginationLinkProps = React.ComponentProps<"button"> & {
  isActive?: boolean;
};

export function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      className={cn(
        "h-9 min-w-9 rounded-lg border px-3 text-sm font-medium transition-all duration-150 cursor-pointer flex items-center justify-center select-none",
        isActive
          ? "bg-primary text-white border-primary shadow-xs font-bold"
          : "bg-white dark:bg-card-dark text-sidebar/80 dark:text-white/80 border-sidebar/20 dark:border-white/10 hover:bg-muted dark:hover:bg-popover-dark hover:text-sidebar dark:hover:text-white",
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({
  className,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      aria-label="Go to previous page"
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 h-9 rounded-lg border px-3 text-sm font-medium transition-all duration-150 cursor-pointer select-none",
        "bg-white dark:bg-card-dark text-sidebar/80 dark:text-white/80 border-sidebar/20 dark:border-white/10 hover:bg-muted dark:hover:bg-popover-dark hover:text-sidebar dark:hover:text-white",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-card-dark disabled:hover:text-sidebar/80 dark:disabled:hover:text-white/80",
        className
      )}
      {...props}
    >
      <ChevronRight className="size-4" />
      <span>السابق</span>
    </button>
  );
}

export function PaginationNext({
  className,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      aria-label="Go to next page"
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 h-9 rounded-lg border px-3 text-sm font-medium transition-all duration-150 cursor-pointer select-none",
        "bg-white dark:bg-card-dark text-sidebar/80 dark:text-white/80 border-sidebar/20 dark:border-white/10 hover:bg-muted dark:hover:bg-popover-dark hover:text-sidebar dark:hover:text-white",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-card-dark disabled:hover:text-sidebar/80 dark:disabled:hover:text-white/80",
        className
      )}
      {...props}
    >
      <span>التالي</span>
      <ChevronLeft className="size-4" />
    </button>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex h-9 w-9 items-center justify-center text-sidebar/60 dark:text-white/50",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
    </span>
  );
}