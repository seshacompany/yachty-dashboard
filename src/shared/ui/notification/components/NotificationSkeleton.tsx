import { Skeleton } from "@/shared/ui/skeleton";

export function NotificationSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col divide-y divide-border">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`notif-skel-${index}`}
          className="p-3.5 flex items-start gap-3 animate-pulse"
        >
          <Skeleton className="size-9 rounded-full shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-12 rounded" />
            </div>
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-4/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
