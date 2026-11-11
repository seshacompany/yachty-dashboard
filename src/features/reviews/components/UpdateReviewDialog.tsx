import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Sparkles, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { updateReviewSchema, type UpdateReviewValues } from "../schemas";
import { useUpdatePlatformReview } from "../hooks";
import type { ReviewItem } from "../types";

type UpdateReviewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: ReviewItem | null;
};

export function UpdateReviewDialog({
  open,
  onOpenChange,
  review,
}: UpdateReviewDialogProps) {
  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateReviewValues>({
    resolver: zodResolver(updateReviewSchema),
    defaultValues: {
      status: "PUBLISHED",
      isFeatured: false,
    },
  });

  const { mutateAsync: updateReview, isPending: isUpdating } = useUpdatePlatformReview();
  const isPending = isUpdating || isSubmitting;

  const currentStatus = watch("status");
  const isFeaturedValue = watch("isFeatured");

  useEffect(() => {
    if (open && review) {
      const initialStatus: "PUBLISHED" | "REJECTED" =
        review.status === "REJECTED" ? "REJECTED" : "PUBLISHED";
      reset({
        status: initialStatus,
        isFeatured: Boolean(review.isFeatured),
      });
    }
  }, [open, review, reset]);

  const handleClose = () => {
    if (isPending) return;
    onOpenChange(false);
  };

  const onSubmit = async (data: UpdateReviewValues) => {
    if (!review?.id) return;
    try {
      await updateReview({
        id: review.id,
        payload: {
          status: data.status,
          isFeatured: data.isFeatured,
        },
      });
      onOpenChange(false);
    } catch {
      // Toast handled by mutation hook
    }
  };

  const reviewerName = review
    ? [review.reviewer?.firstName, review.reviewer?.lastName].filter(Boolean).join(" ")
    : "";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        dir="rtl"
        className="max-w-lg bg-popover dark:bg-card-dark text-sidebar dark:text-white p-6 rounded-2xl"
      >
        <DialogHeader className="border-b border-sidebar/10 dark:border-white/10 pb-4">
          <DialogTitle className="text-xl font-bold text-sidebar dark:text-white">
            إدارة حالة التقييم
          </DialogTitle>
        </DialogHeader>

        {review && (
          <div className="space-y-4 pt-2">
            {/* Review Summary */}
            <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-popover-dark/40 border border-sidebar/10 dark:border-white/5 space-y-1.5">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Status Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  حالة التقييم <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={currentStatus}
                  onValueChange={(val: "PUBLISHED" | "REJECTED") =>
                    setValue("status", val, { shouldValidate: true })
                  }
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر حالة التقييم" />
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value="PUBLISHED">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-4" />
                        <span>نشر التقييم (Published)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="REJECTED">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                        <XCircle className="size-4" />
                        <span>رفض التقييم (Rejected)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-destructive">{errors.status.message}</p>
                )}
              </div>

              {/* isFeatured Checkbox */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20">
                <Checkbox
                  id="review-isFeatured"
                  checked={isFeaturedValue}
                  onCheckedChange={(checked) =>
                    setValue("isFeatured", Boolean(checked), { shouldValidate: true })
                  }
                  disabled={isPending}
                />
                <Label
                  htmlFor="review-isFeatured"
                  className="flex items-center gap-1.5 text-xs font-medium cursor-pointer text-sidebar dark:text-white"
                >
                  <Sparkles className="size-3.5 text-amber-500" />
                  <span>تمييز التقييم في المحتوى المختار للمنصة (Featured)</span>
                </Label>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-sidebar/10 dark:border-white/10 pt-4">
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
                  type="submit"
                  disabled={isPending}
                  className="px-5 flex items-center gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isPending && <Loader2 className="size-4 animate-spin" />}
                  <span>{isPending ? "جاري الحفظ..." : "حفظ التعديلات"}</span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
