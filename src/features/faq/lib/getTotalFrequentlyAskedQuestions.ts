import { api } from "@/lib/axios";

export const getTotalFrequentlyAskedQuestions = async (search?: string): Promise<number> => {
  const params: Record<string, string | number> = { page: 1, limit: 1 };
  if (search?.trim()) params.client_name = search.trim();

  const { data: result } = await api.get("/faq", { params });

  return (result.data.total as number) ?? 0;
};
