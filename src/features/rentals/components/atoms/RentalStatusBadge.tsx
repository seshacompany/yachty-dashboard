import { cn } from "@/lib/utils";
import { rentalStatusBadgeStyles, rentalStatusValue } from "../../data/tableData";
import type { RentalStatus } from "../../types";

type RentalStatusBadgeProps = {
  status: RentalStatus | string;
  className?: string;
};

export function RentalStatusBadge({
  status,
  className,
}: RentalStatusBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold border inline-block",
        rentalStatusBadgeStyles[status as RentalStatus] ||
          "text-sidebar bg-muted",
        className,
      )}
    >
      {rentalStatusValue[status as RentalStatus] || status}
    </span>
  );
}
