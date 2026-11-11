import { Skeleton } from "@/shared/ui/skeleton";

export function OneItemReviewSkeleton() {
  return (
    <div className="flex flex-col gap-3 border border-solid border-white/10 rounded-xl p-4">
      <div className="flex gap-4 justify-between items-center">
        <div className="flex gap-3 items-center">
          <Skeleton className="rounded-full w-12 h-12" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="border-t border-solid border-white/20 pt-3 flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-16 rounded-xl" />
      </div>
    </div>
  );
}
