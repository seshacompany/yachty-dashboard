import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useDeletePlatformReview } from "../hooks";
import type { ReviewItem } from "../types";

type DeleteReviewDialogProps = {
  review: ReviewItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteReviewDialog({
  review,
  open,
  onOpenChange,
}: DeleteReviewDialogProps) {
  const { mutateAsync: deleteReview, isPending } = useDeletePlatformReview();

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const handleConfirm = async () => {
    if (!review?.id) return;
    try {
      await deleteReview(review.id);
      onOpenChange(false);
    } catch {
      // Handled in mutation hook
    }
  };

  const reviewerName = review
    ? [review.reviewer?.firstName, review.reviewer?.lastName].filter(Boolean).join(" ")
    : "هذا المستخدم";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-md bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-6" />
            <DialogTitle className="text-xl font-bold text-destructive">
              حذف التقييم
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {review && (
            <div className="p-3.5 rounded-xl bg-muted/60 dark:bg-popover-dark/60 text-sm flex flex-col gap-1.5 border border-sidebar/10 dark:border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-sidebar dark:text-white">
                  {reviewerName}
                </span>
                <span className="text-amber-500 font-bold">★ {review.rating} / 5</span>
              </div>
              <p className="text-xs text-secondary-light line-clamp-2">
                "{review.comment || "بدون تعليق"}"
              </p>
            </div>
          )}

          <p className="text-sm text-sidebar/80 dark:text-white/70 leading-relaxed">
            هل أنت متأكد من رغبتك في حذف هذا التقييم نهائياً من المنصة؟ لا يمكن التراجع عن هذا الإجراء.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-5 cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirm}
              disabled={isPending}
              className="px-5 flex items-center gap-2 cursor-pointer"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              <span>{isPending ? "جاري الحذف..." : "تأكيد الحذف"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
