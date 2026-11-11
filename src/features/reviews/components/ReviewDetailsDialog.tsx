import { Calendar, Mail, Phone, Sparkles, Star, User } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import type { ReviewItem } from "../types";
import { STATUS_CONFIG } from "./ReviewCard";

type ReviewDetailsDialogProps = {
  review: ReviewItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ReviewDetailsDialog({
  review,
  open,
  onOpenChange,
}: ReviewDetailsDialogProps) {
  if (!review) return null;

  const { rating, comment, status, isFeatured, reviewer, createdAt, updatedAt } = review;
  const fullName = [reviewer?.firstName, reviewer?.lastName].filter(Boolean).join(" ") || "مستخدم";
  const formattedCreatedAt = createdAt ? formatDateToDDMMYYYY(createdAt) : "-";
  const formattedUpdatedAt = updatedAt ? formatDateToDDMMYYYY(updatedAt) : "-";
  const statusInfo = STATUS_CONFIG[status] || {
    label: status,
    className: "bg-muted text-foreground border-border",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-w-lg bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
            تفاصيل التقييم
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5 pt-2">
          {/* Reviewer Profile Card */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-muted/40 dark:bg-popover-dark/40 border border-sidebar/10 dark:border-white/5">
            {reviewer?.avatarUrl ? (
              <img
                src={reviewer.avatarUrl}
                alt={fullName}
                className="size-12 rounded-full object-cover border border-sidebar/10 dark:border-white/10"
              />
            ) : (
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                {fullName.charAt(0) || <User className="size-6" />}
              </div>
            )}

            <div className="flex-1 space-y-1.5 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-sidebar dark:text-white truncate">
                  {fullName}
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {reviewer?.role === "OWNER" ? "صاحب سكن" : "باحث عن سكن"}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-xs text-secondary-light">
                {reviewer?.email && (
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="size-3.5 shrink-0" />
                    <span className="truncate">{reviewer.email}</span>
                  </div>
                )}
                {reviewer?.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="size-3.5 shrink-0" />
                    <span dir="ltr">{reviewer.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status, Featured & Rating Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/10 dark:border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary-light">الحالة:</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusInfo.className}`}>
                {statusInfo.label}
              </span>
              {isFeatured && (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Sparkles className="size-3" />
                  <span>مميز</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`size-4 ${
                      star <= Math.round(rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-sidebar/20 dark:text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-sidebar dark:text-white">
                ({rating} / 5)
              </span>
            </div>
          </div>

          {/* Full Comment */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold text-secondary-light">نص التعليق / التقييم:</h4>
            <div className="p-4 rounded-xl bg-muted/40 dark:bg-popover-dark/40 border border-sidebar/10 dark:border-white/5 text-sm text-sidebar dark:text-white leading-relaxed whitespace-pre-wrap">
              {comment || "لا يوجد نص تعليق مكتوب."}
            </div>
          </div>

          {/* Dates & Timestamps */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-secondary-light border-t border-sidebar/10 dark:border-white/10 pt-3">
            <div className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              <span>تاريخ الإرسال: {formattedCreatedAt}</span>
            </div>
            {updatedAt && updatedAt !== createdAt && (
              <span>آخر تعديل: {formattedUpdatedAt}</span>
            )}
          </div>

          {/* Close button */}
          <div className="flex justify-end pt-1">
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
