import { api } from "@/lib/axios";
import type { termsConditionsItemType } from "../types";

export type GetTermsConditionsItemTypeParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export type GetTermsConditionsItemTypeResponse = {
  data: termsConditionsItemType[];
  totalPage: number;
};

export const getTermsConditionsItem = async ({
  search,
  page = 1,
  limit = 10,
}: GetTermsConditionsItemTypeParams = {}): Promise<GetTermsConditionsItemTypeResponse> => {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.content = search;

  const { data: result } = await api.get("/terms-and-conditions", { params });

  return {
    data: result.data.items ?? [],
    totalPage: result.data.totalPages ?? 0,
  };
};
