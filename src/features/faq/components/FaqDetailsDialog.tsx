import { Calendar, CheckCircle, Info, XCircle } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import type { FaqItem } from "../types";

type FaqDetailsDialogProps = {
  faq: FaqItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FaqDetailsDialog({
  faq,
  open,
  onOpenChange,
}: FaqDetailsDialogProps) {
  if (!faq) return null;

  const formattedCreatedAt = faq.createdAt
    ? formatDateToDDMMYYYY(faq.createdAt)
    : "-";
  const formattedUpdatedAt = faq.updatedAt
    ? formatDateToDDMMYYYY(faq.updatedAt)
    : "-";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-lg bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <Info className="size-5" />
            <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
              تفاصيل السؤال الشائع
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5 pt-2">
          {/* Status and Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-muted/50 dark:bg-popover-dark/50 border border-sidebar/10 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-light">الحالة:</span>
              <span
                className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                  faq.isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {faq.isActive ? (
                  <>
                    <CheckCircle className="size-3" />
                    <span>نشط</span>
                  </>
                ) : (
                  <>
                    <XCircle className="size-3" />
                    <span>غير نشط</span>
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-secondary-light">
              <div className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                <span>تاريخ الإنشاء: {formattedCreatedAt}</span>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-secondary-light">السؤال:</h4>
            <p className="text-base font-bold text-sidebar dark:text-white leading-relaxed">
              {faq.question}
            </p>
          </div>

          {/* Answer */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-secondary-light">الإجابة:</h4>
            <div className="p-4 rounded-xl bg-muted/40 dark:bg-popover-dark/40 border border-sidebar/10 dark:border-white/5 text-sm text-sidebar/90 dark:text-white/90 leading-relaxed whitespace-pre-wrap">
              {faq.answer}
            </div>
          </div>

          {/* Footer Timestamps */}
          {faq.updatedAt && (
            <div className="flex justify-end text-xs text-secondary-light">
              <span>آخر تحديث: {formattedUpdatedAt}</span>
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-sidebar/10 dark:border-white/10">
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
