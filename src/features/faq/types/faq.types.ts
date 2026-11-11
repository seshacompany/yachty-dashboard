export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
};

// Aliases for compatibility
export type frequentlyAskedQuestionsItemType = FaqItem;

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type FaqsData = {
  items: FaqItem[];
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

export type FaqsApiResponse = PaginatedResponse<FaqItem>;

export type SingleFaqApiResponse = {
  success: boolean;
  message: string;
  data: FaqItem;
};

export type CreateFaqPayload = {
  question: string;
  answer: string;
  isActive: boolean;
  sortOrder?: number;
};

export type UpdateFaqPayload = Partial<CreateFaqPayload>;

export type FaqsQueryParams = {
  search?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  limit?: number;
};

export type FaqActionResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};
