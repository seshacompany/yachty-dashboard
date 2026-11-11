import { api } from "@/lib/axios";

export const exportCustomersPdf = async (): Promise<Blob> => {
  const { data } = await api.get("/customers/export/pdf", {
    responseType: "blob",
  });
  return data as Blob;
};
