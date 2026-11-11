import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StarOff } from "lucide-react";
import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
import {
  DeleteReviewDialog,
  ReviewCard,
  ReviewDetailsDialog,
  ReviewsFilterBar,
  ReviewsSkeleton,
  UpdateReviewDialog,
} from "../components";
import { useGetPlatformReviews } from "../hooks";
import type { ReviewItem, ReviewStatus, SortOrder } from "../types";

const SKELETON_COUNT = 6;
const ITEMS_PER_PAGE = 9;

export function ReviewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const statusParam = searchParams.get("status");
  const status =
    statusParam && statusParam !== "ALL"
      ? (statusParam as ReviewStatus)
      : undefined;

  const featuredParam = searchParams.get("isFeatured");
  const isFeatured =
    featuredParam === "true"
      ? true
      : featuredParam === "false"
      ? false
      : undefined;

  const sortOrder =
    (searchParams.get("sortOrder") as SortOrder) || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useGetPlatformReviews({
    search,
    status,
    isFeatured,
    sortOrder,
    page,
    limit: ITEMS_PER_PAGE,
  });

  const items = data?.items ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(newPage));
      return next;
    });
  };

  // Modal dialog states
  const [moderatingReview, setModeratingReview] = useState<ReviewItem | null>(null);
  const [deletingReview, setDeletingReview] = useState<ReviewItem | null>(null);
  const [viewingReview, setViewingReview] = useState<ReviewItem | null>(null);

  const hasFilterActive =
    Boolean(search) ||
    Boolean(status) ||
    isFeatured !== undefined ||
    Boolean(sortOrder);

  return (
    <div className="w-full flex flex-col gap-6" dir="rtl">
      {/* Top Filter and Action Bar */}
      <ReviewsFilterBar totalItems={meta?.totalItems} />

      {/* Main Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <ReviewsSkeleton key={idx} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-sidebar/20 dark:border-white/10 rounded-2xl py-20 text-center bg-card/50 dark:bg-card-dark/50">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            <StarOff className="size-8" />
          </div>
          <p className="text-lg font-bold text-sidebar dark:text-white">
            لا توجد تقييمات
          </p>
          <p className="text-sm text-secondary-light max-w-sm">
            {hasFilterActive
              ? "لم يتم العثور على أي تقييمات تطابق معايير البحث والفلترة الحالية."
              : "لم يتم إرسال أي تقييمات من المستخدمين حتى الآن."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onView={(rev) => setViewingReview(rev)}
              onModerate={(rev) => setModeratingReview(rev)}
              onDelete={(rev) => setDeletingReview(rev)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <PaginationLayout
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Moderate / Edit Status Dialog */}
      <UpdateReviewDialog
        open={Boolean(moderatingReview)}
        onOpenChange={(open) => {
          if (!open) setModeratingReview(null);
        }}
        review={moderatingReview}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteReviewDialog
        open={Boolean(deletingReview)}
        onOpenChange={(open) => {
          if (!open) setDeletingReview(null);
        }}
        review={deletingReview}
      />

      {/* Full Details Modal */}
      <ReviewDetailsDialog
        open={Boolean(viewingReview)}
        onOpenChange={(open) => {
          if (!open) setViewingReview(null);
        }}
        review={viewingReview}
      />
    </div>
  );
}

export default ReviewsPage;
