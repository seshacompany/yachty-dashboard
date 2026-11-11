import { Skeleton } from "@/shared/ui/skeleton";

export function TermsSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar/10 dark:border-white/10 bg-card dark:bg-card-dark p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-3/4 rounded-md" />
          <div className="flex gap-1">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="size-6 rounded-md" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-sidebar/10 dark:border-white/10 pt-3">
        <Skeleton className="h-3 w-16 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  );
}

// Alias for backwards compatibility
export const TermsCardSkeleton = TermsSkeleton;
