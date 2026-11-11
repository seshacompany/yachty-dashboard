export type ReviewStatus = "PENDING" | "PUBLISHED" | "REJECTED";

export type SortOrder = "ASC" | "DESC";

export type ReviewUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  gender: "MALE" | "FEMALE" | string | null;
  role: string;
  status: string;
  adminType: string | null;
  avatarUrl: string | null;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ReviewItem = {
  id: string;
  rating: number;
  comment: string;
  status: ReviewStatus;
  reviewer: ReviewUser;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  [key: string]: any;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ReviewsData = {
  items: ReviewItem[];
  meta: PaginationMeta;
};

export type PaginatedResponse<T> = {
  success: boolean;
  message: string;
  data: {
    items: T[];
    meta: PaginationMeta;
  };
};

export type ReviewsApiResponse = PaginatedResponse<ReviewItem>;

export type SingleReviewApiResponse = {
  success: boolean;
  message: string;
  data: ReviewItem;
};

export type UpdateReviewPayload = {
  status: "PUBLISHED" | "REJECTED";
  isFeatured?: boolean;
};

export type ReviewsQueryParams = {
  search?: string;
  status?: ReviewStatus;
  isFeatured?: boolean;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
};

export type ReviewActionResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

// Aliases for backwards compatibility and temp data
export type reviewItemType = {
  id: string;
  image?: string;
  name?: string;
  position?: string;
  stars?: number;
  description?: string;
  status?: "pending" | "active" | "inactive" | "suspended" | "deleted" | ReviewStatus;
  createdAt: string;
  updatedAt?: string;
  [key: string]: any;
};
export type ReviewType = ReviewItem;
