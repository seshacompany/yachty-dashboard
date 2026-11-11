import { api } from "@/lib/axios";

export const deleteCustomerFeedback = async (id: string) => {
  const { data } = await api.delete(`/faq/${id}`);
  return data;
};
