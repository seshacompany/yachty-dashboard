import type {
  CreateTermPayload,
  TermActionResponse,
  TermItem,
  TermsData,
  TermsQueryParams,
  UpdateTermPayload,
} from "../types";
import termsMockData from "@/data/response/response_terms.json";

export const getTerms = async (
  params: TermsQueryParams = {}
): Promise<TermsData> => {
  let items = [...termsMockData.data.items];

  if (params.search) {
    const s = params.search.toLowerCase();
    items = items.filter(
      (term) =>
        term.title?.toLowerCase().includes(s) ||
        term.content?.toLowerCase().includes(s)
    );
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems as unknown as TermItem[],
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

export const getTermById = async (id: string): Promise<TermItem> => {
  const found = termsMockData.data.items.find((item) => item.id === id);
  if (found) {
    return found as unknown as TermItem;
  }
  return termsMockData.data.items[0] as unknown as TermItem;
};

export const createTerm = async (
  payload: CreateTermPayload
): Promise<TermActionResponse> => {
  return {
    success: true,
    message: "تم إنشاء البند بنجاح",
    data: {
      id: "mock-term-id-" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload,
    } as unknown as TermItem,
  };
};

export const updateTerm = async (
  id: string,
  payload: UpdateTermPayload
): Promise<TermActionResponse> => {
  return {
    success: true,
    message: "تم تحديث البند بنجاح",
    data: {
      id,
      updatedAt: new Date().toISOString(),
      ...payload,
    } as unknown as TermItem,
  };
};

export const deleteTerm = async (id: string): Promise<TermActionResponse> => {
  return {
    success: true,
    message: "تم حذف البند بنجاح",
    data: { id } as unknown as TermItem,
  };
};
