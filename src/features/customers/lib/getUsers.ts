import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type { GetUsersParams, UsersResponse } from "../types";

const getAuthHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const getUsers = async (
  params: GetUsersParams = {},
): Promise<UsersResponse> => {
  const cleanParams: Record<string, string | number> = {};
  if (params.page) cleanParams.page = params.page;
  if (params.limit) cleanParams.limit = params.limit;
  if (params.email?.trim()) cleanParams.email = params.email.trim();
  if (params.phone?.trim()) cleanParams.phone = params.phone.trim();
  if (params.role) cleanParams.role = params.role;
  if (params.status) cleanParams.status = params.status;
  if (params.fromDate) cleanParams.fromDate = params.fromDate;
  if (params.toDate) cleanParams.toDate = params.toDate;

  const response = await Axios.get<UsersResponse>("/admin/users", {
    params: cleanParams,
    headers: getAuthHeaders(),
  });
  return response.data;
};
