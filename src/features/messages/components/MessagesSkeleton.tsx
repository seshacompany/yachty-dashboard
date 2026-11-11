import { Skeleton } from "@/shared/ui/skeleton";

export function MessagesSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar/10 dark:border-white/10 bg-card dark:bg-card-dark p-5">
      <div className="flex flex-col gap-3">
        {/* Header: Category & Status */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* User Info Header with Avatar */}
        <div className="flex items-center gap-2 border-b border-sidebar/10 dark:border-white/10 pb-2.5">
          <Skeleton className="size-7 rounded-full shrink-0" />
          <Skeleton className="h-4 w-32 rounded-md" />
        </div>

        {/* Subject & Message lines */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
      </div>

      {/* Footer: Date & Actions */}
      <div className="flex items-center justify-between border-t border-sidebar/10 dark:border-white/10 pt-3">
        <Skeleton className="h-3 w-16 rounded-md" />
        <div className="flex gap-1">
          <Skeleton className="h-6 w-12 rounded-md" />
          <Skeleton className="h-6 w-12 rounded-md" />
          <Skeleton className="h-6 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export const MessageCardSkeleton = MessagesSkeleton;
