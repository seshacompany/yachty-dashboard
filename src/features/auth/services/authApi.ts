import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  RefreshResponse,
  User,
} from "@/types/auth";
import type { StaffMeResponse } from "@/features/employees/types";
import authResponseMock from "@/data/response/response_auth.json";
import staffMeMock from "@/data/response/response_staff_me.json";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await Axios.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<RefreshResponse> => {
    const response = await Axios.post<RefreshResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  getMe: async (): Promise<MeResponse> => {
    return {
      success: true,
      message: authResponseMock.message,
      data: authResponseMock.data.user as User,
    };
  },

  getStaffMe: async (): Promise<StaffMeResponse> => {
    return staffMeMock as unknown as StaffMeResponse;
  },

  logout: async (refreshToken?: string | null): Promise<void> => {
    const accessToken = getAccessToken();
    await Axios.post(
      "/auth/logout",
      refreshToken ? { refresh_token: refreshToken } : undefined,
      {
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      },
    );
  },

  logoutAll: async (): Promise<void> => {
    const accessToken = getAccessToken();
    await Axios.post("/auth/logout-all", undefined, {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    });
  },
};
