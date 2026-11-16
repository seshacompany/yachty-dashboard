import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type {
  UpdateUserStatusRequest,
  UpdateUserStatusResponse,
} from "../types";

export const updateUserStatus = async (
  id: string,
  payload: UpdateUserStatusRequest,
): Promise<UpdateUserStatusResponse> => {
  const token = getAccessToken();
  const response = await Axios.patch<UpdateUserStatusResponse>(
    `/admin/users/${id}/status`,
    payload,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  return response.data;
};
