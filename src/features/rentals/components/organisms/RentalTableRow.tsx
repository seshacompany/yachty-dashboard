import { Eye, Gavel, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/ui/checkbox";
import { headers } from "../../data/tableData";
import { getRentalOwnerName, type RentalItem } from "../../types";
import { RentalStatusBadge } from "../atoms/RentalStatusBadge";

type RentalTableRowProps = {
  rental: RentalItem;
  selected: string[];
  setSelected: (value: React.SetStateAction<string[]>) => void;
  onViewDetails: (rental: RentalItem) => void;
  onOpenDecision: (rental: RentalItem) => void;
};

export function RentalTableRow({
  rental,
  selected,
  setSelected,
  onViewDetails,
  onOpenDecision,
}: RentalTableRowProps) {
  const isSelected = selected.includes(rental.id);
  const thumbnailUrl = rental.media?.[0]?.url;
  const ownerName = getRentalOwnerName(rental.owner);

  const toggleOne = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <tr
      className={cn(
        "border-t py-2 border-sidebar/20 dark:border-white/10 transition-colors",
        isSelected
          ? "bg-muted/60 dark:bg-popover-dark/40"
          : "hover:bg-muted/30 dark:hover:bg-card-dark/40",
      )}
    >
      <td className="p-3 py-5 text-center">
        <div className="flex justify-center">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleOne(rental.id)}
          />
        </div>
      </td>

      {headers.map(({ key }) => (
        <td key={key} className="p-3 py-5 text-center">
          {key === "boat" ? (
            <div className="flex items-center justify-center gap-3">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={`${rental.brand} ${rental.model}`}
                  className="size-10 rounded-lg object-cover border border-sidebar/15 dark:border-white/10 shrink-0"
                />
              ) : (
                <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Ship className="size-5" />
                </div>
              )}
              <div className="flex flex-col items-start text-right">
                <span className="font-semibold text-sidebar dark:text-white text-sm">
                  {rental.brand} {rental.model}
                </span>
                <span className="text-xs text-muted-foreground">
                  {rental.boat_type}
                </span>
              </div>
            </div>
          ) : key === "owner_name" ? (
            <span className="text-sm font-medium text-sidebar dark:text-white">
              {ownerName}
            </span>
          ) : key === "owner_phone" ? (
            <span
              className="text-sm text-sidebar/80 dark:text-white/80"
              dir="ltr"
            >
              {rental.owner?.phone || "—"}
            </span>
          ) : key === "status" ? (
            <RentalStatusBadge status={rental.status} />
          ) : key === "actions" ? (
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => onViewDetails(rental)}
                className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer bg-primary/15 text-primary hover:bg-primary hover:text-white"
                title="عرض التفاصيل الكاملة"
              >
                <Eye className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenDecision(rental)}
                className="size-8 rounded-lg flex items-center justify-center transition-all cursor-pointer bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white"
                title="اتخاذ قرار / تغيير الحالة"
              >
                <Gavel className="size-4" />
              </button>
            </div>
          ) : null}
        </td>
      ))}
    </tr>
  );
}
