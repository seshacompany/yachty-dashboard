import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { rentalDecisionOptions } from "../../data/tableData";
import { useRentalDecisionForm } from "../../hooks/useRentalDecisionForm";
import type { RentalDecisionStatus, RentalItem } from "../../types";
import { RentalSummaryCard } from "../molecules/RentalSummaryCard";

type RentalDecisionDialogProps = {
  rental: RentalItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RentalDecisionDialog({
  rental,
  open,
  onOpenChange,
}: RentalDecisionDialogProps) {
  const {
    selectedStatus,
    rejectionReason,
    reasonError,
    isPending,
    handleStatusChange,
    handleReasonChange,
    handleOpenChange,
    handleSubmit,
  } = useRentalDecisionForm(rental, open, onOpenChange);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-md bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/20 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <ShieldAlert className="size-5 text-primary" aria-hidden />
            <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
              تغيير حالة المركب
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            تحديد قرار الإدارة للمركب المعروض للإيجار
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
          {rental && <RentalSummaryCard rental={rental} />}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-sidebar dark:text-white">
              القرار الجديد <span className="text-destructive">*</span>
            </label>
            <Select
              value={selectedStatus}
              onValueChange={(val) =>
                handleStatusChange(val as RentalDecisionStatus)
              }
              disabled={isPending}
            >
              <SelectTrigger className="w-full bg-white dark:bg-card-dark text-sidebar dark:text-white border-sidebar/30 dark:border-white/20">
                <SelectValue placeholder="اختر الحالة..." />
              </SelectTrigger>
              <SelectContent
                dir="rtl"
                className="bg-popover dark:bg-card-dark text-sidebar dark:text-white"
              >
                {rentalDecisionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStatus === "rejected" && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="rejection-reason"
                className="text-sm font-medium text-sidebar dark:text-white"
              >
                سبب الرفض <span className="text-destructive">*</span>
              </label>
              <textarea
                id="rejection-reason"
                rows={3}
                value={rejectionReason}
                onChange={(e) => handleReasonChange(e.target.value)}
                placeholder="اكتب سبب رفض المركب بوضوح للمالك..."
                disabled={isPending}
                className="w-full rounded-lg border border-sidebar/30 dark:border-white/20 bg-white dark:bg-card-dark p-3 text-sm text-sidebar dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {reasonError && (
                <p className="text-xs text-destructive font-medium">
                  {reasonError}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
              className="px-5 py-2 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isPending || !selectedStatus}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{isPending ? "جاري الحفظ..." : "تأكيد القرار"}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
