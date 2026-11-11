import { api } from "@/lib/axios";

export const deleteCustomerFeedback = async (id: string) => {
  const { data } = await api.delete(`/customers-feedback/${id}`);
  return data;
};
