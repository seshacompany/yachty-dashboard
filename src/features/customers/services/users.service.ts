import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type {
  GetUsersParams,
  RestoreUserResponse,
  UpdateUserStatusRequest,
  UpdateUserStatusResponse,
  UsersResponse,
} from "../types";

const getAuthHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

const buildUsersQueryParams = (params: GetUsersParams) => {
  const clean: Record<string, string | number> = {};
  if (params.page) clean.page = params.page;
  if (params.limit) clean.limit = params.limit;
  if (params.email?.trim()) clean.email = params.email.trim();
  if (params.phone?.trim()) clean.phone = params.phone.trim();
  if (params.role) clean.role = params.role;
  if (params.status) clean.status = params.status;
  if (params.fromDate) clean.fromDate = params.fromDate;
  if (params.toDate) clean.toDate = params.toDate;
  return clean;
};

export const getUsers = async (
  params: GetUsersParams = {},
): Promise<UsersResponse> => {
  const response = await Axios.get<UsersResponse>("/admin/users", {
    params: buildUsersQueryParams(params),
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const updateUserStatus = async (
  id: string,
  payload: UpdateUserStatusRequest,
): Promise<UpdateUserStatusResponse> => {
  const response = await Axios.patch<UpdateUserStatusResponse>(
    `/admin/users/${id}/status`,
    payload,
    { headers: getAuthHeaders() },
  );
  return response.data;
};

export const restoreUser = async (id: string): Promise<RestoreUserResponse> => {
  const response = await Axios.patch<RestoreUserResponse>(
    `/admin/users/${id}/restore`,
    undefined,
    { headers: getAuthHeaders() },
  );
  return response.data;
};
