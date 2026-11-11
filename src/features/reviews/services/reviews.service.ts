import type {
  ReviewActionResponse,
  ReviewItem,
  ReviewsData,
  ReviewsQueryParams,
  UpdateReviewPayload,
} from "../types";
import reviewsMockData from "@/data/response/response_platform_reviews.json";

export const getPlatformReviews = async (
  params: ReviewsQueryParams = {}
): Promise<ReviewsData> => {
  let items = [...reviewsMockData.data.items];

  if (params.search) {
    const s = params.search.toLowerCase();
    items = items.filter(
      (review) =>
        review.comment?.toLowerCase().includes(s) ||
        review.reviewer?.firstName?.toLowerCase().includes(s) ||
        review.reviewer?.lastName?.toLowerCase().includes(s) ||
        review.reviewer?.email?.toLowerCase().includes(s)
    );
  }

  if (params.status) {
    items = items.filter((review) => review.status === params.status);
  }

  if (params.isFeatured !== undefined) {
    items = items.filter((review) => review.isFeatured === params.isFeatured);
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems as unknown as ReviewItem[],
    meta: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

export const getPlatformReviewById = async (id: string): Promise<ReviewItem> => {
  const found = reviewsMockData.data.items.find((item) => item.id === id);
  if (found) {
    return found as unknown as ReviewItem;
  }
  return reviewsMockData.data.items[0] as unknown as ReviewItem;
};

export const updatePlatformReview = async (
  id: string,
  payload: UpdateReviewPayload
): Promise<ReviewActionResponse> => {
  return {
    success: true,
    message: "تم تحديث التقييم بنجاح",
    data: {
      id,
      updatedAt: new Date().toISOString(),
      ...payload,
    } as unknown as ReviewItem,
  };
};

export const deletePlatformReview = async (
  id: string
): Promise<ReviewActionResponse> => {
  return {
    success: true,
    message: "تم حذف التقييم بنجاح",
    data: { id } as unknown as ReviewItem,
  };
};
