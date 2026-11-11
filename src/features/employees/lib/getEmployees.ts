import { api } from "@/lib/axios";
import type { Employee } from "../types";

export type GetEmployeesParams = {
  search?: string;
  page?: number;
  limit?: number;
  area?: string;
  status?: string;
  progress?: string;
  job_title?: string;
};

export type GetEmployeesResponse = {
  data: Employee[];
  totalPages: number;
  totalMembers: number;
  activeEmployees: number;
  totalApplications: number;
};

export const getEmployees = async ({
  search,
  page = 1,
  limit = 10,
  area,
  status,
  progress,
  job_title,
}: GetEmployeesParams = {}): Promise<GetEmployeesResponse> => {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.employee_name = search;
  if (area) params.area = area;
  if (status) params.status = status;
  if (progress) params.progress = progress;
  if (job_title) params.job_title = job_title;

  const { data: result } = await api.get("/staff", { params });

  return {
    data: result.data.items ?? [],
    totalPages: result.data.totalPages ?? 0,
    totalMembers:
      result.data.totalMembers ??
      result.data.totalEmployees ??
      result.data.total ??
      0,
    activeEmployees: result.data.activeEmployees ?? 0,
    totalApplications: result.data.totalApplications ?? 0,
  };
};
