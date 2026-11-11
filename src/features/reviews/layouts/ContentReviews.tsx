// import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";

import { ReviewsData } from "@/data/temp/reviewsData";
import { OneItemReview } from "../components/organisms/OneItemReview";
import { OneItemReviewSkeleton } from "../components/organisms/OneItemReviewSkeleton";

const SKELETON_COUNT = 6;

export function ContentReviews() {
  // const [searchParams] = useSearchParams();

  // const search = searchParams.get("search") || "";
  // const page = Number(searchParams.get("page")) || 1;

  // const { isLoading } = useReviews({ search, page });
  const data = ReviewsData

  const isLoading = false;

  // const reviews = data?.data ?? [];
  // const totalPages = data?.totalPage ?? 0;

  const reviews = data ?? [];
  // const totalPages = data ?? 0;

  return (
    <>
      {isLoading ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <OneItemReviewSkeleton key={idx} />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-sidebar/40 dark:border-white/20 rounded-xl py-16 text-secondary-light">
          <p className="text-lg">لا توجد تقييمات</p>
          <p className="text-sm">لم يتم العثور على أي تقييمات لعرضها</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {reviews.map((item) => (
            <OneItemReview data={item} key={item.id} />
          ))}
        </div>
      )}

      {/* {totalPages > 1 && <PaginationLayout totalPages={totalPages} />} */}
    </>
  );
}
