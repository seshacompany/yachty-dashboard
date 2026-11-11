import { api } from "@/lib/axios";

export const deleteTermsCondition = async (id: string) => {
  const { data } = await api.delete(`/terms-and-conditions/${id}`);
  return data;
};
