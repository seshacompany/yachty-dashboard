import { api } from "@/lib/axios";
import type { CreateTermsConditionsType } from "../schemas/create.TermsConditions";

export const createTermsConditions = async (termsConditionsData: CreateTermsConditionsType) => {
  const { data } = await api.post("/terms-and-conditions", termsConditionsData);
  return data;
};
