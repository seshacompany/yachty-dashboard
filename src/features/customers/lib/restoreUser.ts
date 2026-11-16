import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type { RestoreUserResponse } from "../types";

export const restoreUser = async (id: string): Promise<RestoreUserResponse> => {
  const token = getAccessToken();
  const response = await Axios.patch<RestoreUserResponse>(
    `/admin/users/${id}/restore`,
    undefined,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );
  return response.data;
};
