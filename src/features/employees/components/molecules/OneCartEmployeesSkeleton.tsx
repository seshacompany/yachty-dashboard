import { Skeleton } from "@/shared/ui/skeleton";

export function OneCartEmployeesSkeleton() {
  return (
    <div className="border border-solid border-white/20 p-4 rounded-xl flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-10 w-20" />
    </div>
  );
}
