import { Eye, Settings2, Sparkles, Star, Trash2, User } from "lucide-react";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { Button } from "@/shared/ui/button";
import type { ReviewItem, ReviewStatus } from "../types";

type ReviewCardProps = {
  review: ReviewItem;
  onView: (review: ReviewItem) => void;
  onModerate: (review: ReviewItem) => void;
  onDelete: (review: ReviewItem) => void;
};

export const STATUS_CONFIG: Record<
  ReviewStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "معلق",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  PUBLISHED: {
    label: "منشور",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  REJECTED: {
    label: "مرفوض",
    className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
};

export function ReviewCard({
  review,
  onView,
  onModerate,
  onDelete,
}: ReviewCardProps) {
  const { rating, comment, status, isFeatured, reviewer, createdAt } = review;

  const fullName = [reviewer?.firstName, reviewer?.lastName].filter(Boolean).join(" ") || "مستخدم";
  const formattedDate = createdAt ? formatDateToDDMMYYYY(createdAt) : "";
  const statusInfo = STATUS_CONFIG[status] || {
    label: status,
    className: "bg-muted text-foreground border-border",
  };

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-card-dark p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex flex-col gap-3.5">
        {/* Header: User Info & Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {reviewer?.avatarUrl ? (
              <img
                src={reviewer.avatarUrl}
                alt={fullName}
                className="size-9 rounded-full object-cover border border-sidebar/10 dark:border-white/10"
              />
            ) : (
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                {fullName.charAt(0) || <User className="size-4" />}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-sidebar dark:text-white line-clamp-1">
                {fullName}
              </span>
              <span className="text-[11px] text-secondary-light">
                {reviewer?.role === "OWNER" ? "صاحب سكن" : "باحث عن سكن"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium border ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
            {isFeatured && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles className="size-2.5" />
                <span>مميز</span>
              </span>
            )}
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 pt-0.5">
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
          <span className="text-xs font-bold text-sidebar/80 dark:text-white/80 mr-1">
            {rating} / 5
          </span>
        </div>

        {/* Comment snippet */}
        <p className="text-sm text-sidebar/90 dark:text-white/90 line-clamp-3 leading-relaxed">
          {comment || "بدون تعليق مكتوب"}
        </p>
      </div>

      {/* Footer: Date and Action Buttons */}
      <div className="flex items-center justify-between border-t border-sidebar/10 dark:border-white/10 pt-3 text-xs">
        <span className="text-secondary-light text-[11px]">{formattedDate}</span>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onView(review)}
            className="flex items-center gap-1 text-xs text-sidebar/80 dark:text-white/80 hover:text-primary cursor-pointer px-2 py-1"
            title="عرض التفاصيل"
          >
            <Eye className="size-3.5" />
            <span>عرض</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onModerate(review)}
            className="flex items-center gap-1 text-xs text-primary hover:bg-primary/10 cursor-pointer px-2 py-1 font-medium"
            title="إدارة ونشر التقييم"
          >
            <Settings2 className="size-3.5" />
            <span>إدارة</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(review)}
            className="text-sidebar/70 hover:text-destructive dark:text-white/70 dark:hover:text-destructive cursor-pointer"
            title="حذف التقييم"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export const OneItemReview = ReviewCard;
