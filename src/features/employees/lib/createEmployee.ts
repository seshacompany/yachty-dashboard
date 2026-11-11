import { api } from "@/lib/axios";
import type { CreateEmployeeType } from "../schemas/create.employee";

export const createStaff = async (staffData: CreateEmployeeType) => {
  const { data } = await api.post("/staff", staffData);
  return data;
};
