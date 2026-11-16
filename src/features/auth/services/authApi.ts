import { Axios } from "@/lib/axios";
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

  refresh: async (_refreshToken: string): Promise<RefreshResponse> => {
    return {
      success: true,
      message: "تم تحديث الجلسة بنجاح",
      data: {
        accessToken: authResponseMock.data.access_token,
        refreshToken: authResponseMock.data.refresh_token,
      },
    };
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

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },
};
