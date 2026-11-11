export type TermItem = {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
};

// Aliases for backwards compatibility
export type termsConditionsItemType = TermItem;
export type FaqItem = TermItem;

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type TermsData = {
  items: TermItem[];
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

export type TermsApiResponse = PaginatedResponse<TermItem>;
export type TermsResponse = TermsApiResponse;

export type SingleTermApiResponse = {
  success: boolean;
  message: string;
  data: TermItem;
};

export type CreateTermPayload = {
  title: string;
  content: string;
  isActive: boolean;
};

export type UpdateTermPayload = {
  title?: string;
  content?: string;
  isActive?: boolean;
};

export type TermsQueryParams = {
  search?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  limit?: number;
};

export type TermActionResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};
