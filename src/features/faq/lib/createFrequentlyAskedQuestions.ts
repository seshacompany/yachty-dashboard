import { api } from "@/lib/axios";
import type { CreateFrequentlyAskedQuestionsType } from "../schemas/create.FrequentlyAskedQuestions";

export const createFrequentlyAskedQuestions = async (frequentlyAskedQuestionsData: CreateFrequentlyAskedQuestionsType) => {
  const { data } = await api.post("/faq", frequentlyAskedQuestionsData);
  return data;
};
