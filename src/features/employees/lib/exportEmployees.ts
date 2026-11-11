import { api } from "@/lib/axios";

export const exportEmployeesPdf = async (): Promise<Blob> => {
  const { data } = await api.get("/staff/export/pdf", {
    responseType: "blob",
  });
  return data as Blob;
};
