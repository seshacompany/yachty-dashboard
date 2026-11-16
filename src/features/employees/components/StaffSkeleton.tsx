import { Skeleton } from "@/shared/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/shared/ui/table";

interface StaffSkeletonProps {
  rows?: number;
}

export function StaffSkeleton({ rows = 5 }: StaffSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow
          key={index}
          className="border-t border-sidebar/20 dark:border-white/10"
        >
          {/* Name & Avatar Skeleton */}
          <TableCell className="p-3 py-5 text-center">
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="size-8 rounded-full shrink-0" />
              <Skeleton className="h-4 w-28" />
            </div>
          </TableCell>

          {/* Job Title Skeleton */}
          <TableCell className="p-3 py-5 text-center">
            <Skeleton className="h-4 w-24 mx-auto" />
          </TableCell>

          {/* Contact Skeleton */}
          <TableCell className="p-3 py-5 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </TableCell>

          {/* Status Skeleton */}
          <TableCell className="p-3 py-5 text-center">
            <Skeleton className="h-6 w-16 mx-auto rounded-full" />
          </TableCell>

          {/* Created At Skeleton */}
          <TableCell className="p-3 py-5 text-center">
            <Skeleton className="h-4 w-20 mx-auto" />
          </TableCell>

          {/* Actions Skeleton */}
          <TableCell className="p-3 py-5 text-center">
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="size-8 rounded-lg" />
              <Skeleton className="size-8 rounded-lg" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
