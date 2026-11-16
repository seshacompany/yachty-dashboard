import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type {
  CreateStaffPayload,
  StaffActionResponse,
  StaffQueryParams,
  StaffResponse,
  StaffSingleResponse,
  UpdateStaffPayload,
  UpdateStaffStatusPayload,
} from "../types";

const getAuthHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const getStaff = async (
  params: StaffQueryParams = {},
): Promise<StaffResponse> => {
  const cleanParams: Record<string, string | number> = {};
  if (params.page) cleanParams.page = params.page;
  if (params.limit) cleanParams.limit = params.limit;
  if (params.staff_name?.trim())
    cleanParams.staff_name = params.staff_name.trim();
  if (params.email?.trim()) cleanParams.email = params.email.trim();
  if (params.jobTitle?.trim()) cleanParams.jobTitle = params.jobTitle.trim();
  if (params.status) cleanParams.status = params.status;

  const response = await Axios.get<StaffResponse>("/admin/staff", {
    params: cleanParams,
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getStaffById = async (id: string): Promise<StaffSingleResponse> => {
  const response = await Axios.get<StaffSingleResponse>(`/admin/staff/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createStaff = async (
  payload: CreateStaffPayload,
): Promise<StaffActionResponse> => {
  const response = await Axios.post<StaffActionResponse>(
    "/admin/staff",
    payload,
    {
      headers: getAuthHeaders(),
    },
  );
  return response.data;
};

export const updateStaff = async (
  id: string,
  payload: UpdateStaffPayload,
): Promise<StaffActionResponse> => {
  const response = await Axios.patch<StaffActionResponse>(
    `/admin/staff/${id}`,
    payload,
    {
      headers: getAuthHeaders(),
    },
  );
  return response.data;
};

export const updateStaffStatus = async (
  id: string,
  payload: UpdateStaffStatusPayload,
): Promise<StaffActionResponse> => {
  const response = await Axios.patch<StaffActionResponse>(
    `/admin/staff/${id}/status`,
    payload,
    {
      headers: getAuthHeaders(),
    },
  );
  return response.data;
};

export const deleteStaff = async (id: string): Promise<StaffActionResponse> => {
  const response = await Axios.delete<StaffActionResponse>(
    `/admin/staff/${id}`,
    {
      headers: getAuthHeaders(),
    },
  );
  return response.data;
};
