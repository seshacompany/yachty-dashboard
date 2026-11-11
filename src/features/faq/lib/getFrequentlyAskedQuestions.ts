import { api } from "@/lib/axios";
import type { frequentlyAskedQuestionsItemType } from "../types";

export type GetFrequentlyAskedQuestionsParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type GetFrequentlyAskedQuestionsResponse = {
  data: frequentlyAskedQuestionsItemType[];
  totalPage: number;
};

export const getFrequentlyAskedQuestions = async ({
  search,
  page = 1,
  limit = 10,
}: GetFrequentlyAskedQuestionsParams = {}): Promise<GetFrequentlyAskedQuestionsResponse> => {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.question = search;

  const { data: result } = await api.get("/faq", { params });

  return {
    data: result.data.items ?? [],
    totalPage: result.data.totalPages ?? 0,
  };
};
