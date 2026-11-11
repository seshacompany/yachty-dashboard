import { Calendar, CheckCircle, Info, ListChecks, XCircle } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import type { TermItem } from "../types";

type TermDetailsDialogProps = {
  term: TermItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TermDetailsDialog({
  term,
  open,
  onOpenChange,
}: TermDetailsDialogProps) {
  if (!term) return null;

  const formattedCreatedAt = term.createdAt
    ? formatDateToDDMMYYYY(term.createdAt)
    : "-";
  const formattedUpdatedAt = term.updatedAt
    ? formatDateToDDMMYYYY(term.updatedAt)
    : "-";

  // Parse comma-separated points (handles standard ',' and Arabic '،')
  const points = term.content
    ? term.content
        .split(/[,،]+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    : [];

  const hasMultiplePoints = points.length > 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-lg bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary">
            <Info className="size-5" />
            <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
              تفاصيل الشرط
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-5 pt-2">
          {/* Status and Creation Date */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-muted/50 dark:bg-popover-dark/50 border border-sidebar/10 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-light">الحالة:</span>
              <span
                className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                  term.isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {term.isActive ? (
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

          {/* Title */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-secondary-light">عنوان الشرط:</h4>
            <p className="text-base font-bold text-sidebar dark:text-white leading-relaxed">
              {term.title}
            </p>
          </div>

          {/* Comma-separated Bulleted List (if points exist) */}
          {hasMultiplePoints ? (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <ListChecks className="size-4" />
                <h4>بنود ونقاط الشرط ({points.length} نقاط):</h4>
              </div>
              <ul className="space-y-2 rounded-xl bg-muted/40 dark:bg-popover-dark/40 border border-sidebar/10 dark:border-white/5 p-4 text-sm text-sidebar/90 dark:text-white/90">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary mt-0.5">
                      {index + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* Single Content text */
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-secondary-light">المحتوى / النص:</h4>
              <div className="p-4 rounded-xl bg-muted/40 dark:bg-popover-dark/40 border border-sidebar/10 dark:border-white/5 text-sm text-sidebar/90 dark:text-white/90 leading-relaxed whitespace-pre-wrap">
                {term.content}
              </div>
            </div>
          )}

          {/* Footer Timestamps */}
          {term.updatedAt && (
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
