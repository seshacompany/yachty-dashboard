import { api } from "@/lib/axios";
import type { UpdateTermsConditionsType } from "../schemas/edit.TermsConditions";

export const updateTermsConditions = async (
  id: string,
  termsConditionsData: UpdateTermsConditionsType,
) => {
  const { data } = await api.patch(`/terms-and-conditions/${id}`, termsConditionsData);
  return data;
};
