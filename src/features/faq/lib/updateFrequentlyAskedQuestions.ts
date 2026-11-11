import { api } from "@/lib/axios";
import type { UpdateFrequentlyAskedQuestionsType } from "../schemas/edit.FrequentlyAskedQuestions";

export const updateFrequentlyAskedQuestions = async (
  id: string,
  frequentlyAskedQuestionsData: UpdateFrequentlyAskedQuestionsType,
) => {
  const { data } = await api.patch(`/faq/${id}`, frequentlyAskedQuestionsData);
  return data;
};
