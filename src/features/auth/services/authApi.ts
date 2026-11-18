import { Axios } from "@/lib/axios";
import { getAccessToken } from "@/lib/tokenStorage";
import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  RefreshResponse,
  RequestOtpPayload,
  RequestOtpResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  User,
  VerifyOtpPayload,
  VerifyOtpResponse,
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

  requestForgotPasswordOtp: async (
    payload: RequestOtpPayload,
  ): Promise<RequestOtpResponse> => {
    const response = await Axios.post<RequestOtpResponse>(
      "/auth/forgot-password/request-otp",
      payload,
    );
    return response.data;
  },

  verifyForgotPasswordOtp: async (
    payload: VerifyOtpPayload,
  ): Promise<VerifyOtpResponse> => {
    const response = await Axios.post<VerifyOtpResponse>(
      "/auth/forgot-password/verify-otp",
      payload,
    );
    return response.data;
  },

  resetPassword: async (
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> => {
    const response = await Axios.post<ResetPasswordResponse>(
      "/auth/reset-password",
      payload,
    );
    return response.data;
  },
};
