import { Skeleton } from "@/shared/ui/skeleton";

export function ReviewsSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark p-5 shadow-xs">
      <div className="flex flex-col gap-3">
        {/* Header Skeleton */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-9 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-2.5 w-16 rounded" />
            </div>
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>

        {/* Rating Stars Skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3.5 w-20 rounded" />
          <Skeleton className="h-3 w-8 rounded" />
        </div>

        {/* Text Skeleton */}
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
          <Skeleton className="h-3.5 w-2/3 rounded" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between border-t border-sidebar/10 dark:border-white/10 pt-3">
        <Skeleton className="h-3 w-20 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded-lg" />
          <Skeleton className="h-6 w-12 rounded-lg" />
          <Skeleton className="h-6 w-6 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export const OneItemReviewSkeleton = ReviewsSkeleton;
