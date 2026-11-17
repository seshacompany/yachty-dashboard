import { getRentalOwnerName, type RentalItem } from "../../types";
import { RentalStatusBadge } from "../atoms/RentalStatusBadge";

type RentalSummaryCardProps = {
  rental: RentalItem;
};

export function RentalSummaryCard({ rental }: RentalSummaryCardProps) {
  return (
    <div className="p-3 rounded-lg bg-muted/60 dark:bg-popover-dark/60 text-sm flex flex-col gap-2 border border-sidebar/10 dark:border-white/5">
      <div className="flex justify-between items-center">
        <span className="text-sidebar/70 dark:text-white/60">المركب:</span>
        <span className="font-semibold text-sidebar dark:text-white">
          {rental.brand} {rental.model}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sidebar/70 dark:text-white/60">المالك:</span>
        <span className="text-sidebar/90 dark:text-white/80 text-xs">
          {getRentalOwnerName(rental.owner)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sidebar/70 dark:text-white/60">
          الحالة الحالية:
        </span>
        <RentalStatusBadge status={rental.status} className="px-2.5 py-0.5" />
      </div>
    </div>
  );
}
