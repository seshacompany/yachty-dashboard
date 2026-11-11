import type {
  CreateFaqPayload,
  FaqActionResponse,
  FaqItem,
  FaqsData,
  FaqsQueryParams,
  UpdateFaqPayload,
} from "../types";
import faqMockData from "@/data/response/response_faq.json";

export const getFaqs = async (
  params: FaqsQueryParams = {}
): Promise<FaqsData> => {
  let items = [...faqMockData.data.items];

  if (params.search) {
    const s = params.search.toLowerCase();
    items = items.filter(
      (faq) =>
        faq.question?.toLowerCase().includes(s) ||
        faq.answer?.toLowerCase().includes(s)
    );
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems as unknown as FaqItem[],
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

export const getFaqById = async (id: string): Promise<FaqItem> => {
  const found = faqMockData.data.items.find((item) => item.id === id);
  if (found) {
    return found as unknown as FaqItem;
  }
  return faqMockData.data.items[0] as unknown as FaqItem;
};

export const createFaq = async (
  payload: CreateFaqPayload
): Promise<FaqActionResponse> => {
  return {
    success: true,
    message: "تم إنشاء السؤال الشائع بنجاح",
    data: {
      id: "mock-faq-id-" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload,
    } as unknown as FaqItem,
  };
};

export const updateFaq = async (
  id: string,
  payload: UpdateFaqPayload
): Promise<FaqActionResponse> => {
  return {
    success: true,
    message: "تم تحديث السؤال الشائع بنجاح",
    data: {
      id,
      updatedAt: new Date().toISOString(),
      ...payload,
    } as unknown as FaqItem,
  };
};

export const deleteFaq = async (id: string): Promise<FaqActionResponse> => {
  return {
    success: true,
    message: "تم حذف السؤال الشائع بنجاح",
    data: { id } as unknown as FaqItem,
  };
};
