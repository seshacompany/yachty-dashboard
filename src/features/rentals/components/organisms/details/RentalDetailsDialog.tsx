import { Ship } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import type { RentalItem } from "../../../types";
import { RentalStatusBadge } from "../../atoms/RentalStatusBadge";
import { RentalMediaSection } from "./RentalMediaSection";
import { RentalOwnerSection } from "./RentalOwnerSection";
import { RentalPricingSection } from "./RentalPricingSection";
import { RentalSpecsSection } from "./RentalSpecsSection";

type RentalDetailsDialogProps = {
  rental: RentalItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RentalDetailsDialog({
  rental,
  open,
  onOpenChange,
}: RentalDetailsDialogProps) {
  if (!rental) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-3xl max-h-[90vh] overflow-y-auto bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-sidebar dark:text-white">
              <Ship className="size-5 text-primary" />
              <span>
                {rental.brand} {rental.model}
              </span>
            </DialogTitle>
            <RentalStatusBadge status={rental.status} />
          </div>
          <DialogDescription className="sr-only">
            التفاصيل الكاملة للمركب المعروض للإيجار
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RentalSpecsSection rental={rental} />
            <div className="flex flex-col gap-4">
              <RentalPricingSection rental={rental} />
              <RentalOwnerSection owner={rental.owner} />
            </div>
          </div>

          <RentalMediaSection rental={rental} />

          <div className="flex items-center justify-end border-t border-sidebar/10 dark:border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6 cursor-pointer"
            >
              إغلاق
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
