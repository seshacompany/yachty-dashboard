import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  RefreshResponse,
} from "@/types/auth";
import type { StaffMeResponse } from "@/features/employees/types";
import loginStaffMock from "@/data/response/response_login_staff.json";
import staffMeMock from "@/data/response/response_staff_me.json";

export const authApi = {
  login: async (_payload?: LoginPayload): Promise<LoginResponse> => {
    return loginStaffMock as unknown as LoginResponse;
  },

  refresh: async (_refreshToken: string): Promise<RefreshResponse> => {
    return {
      success: true,
      message: "تم تحديث الجلسة بنجاح",
      data: {
        accessToken: loginStaffMock.data.accessToken,
        refreshToken: loginStaffMock.data.refreshToken,
      },
    };
  },

  getMe: async (): Promise<MeResponse> => {
    return {
      success: true,
      message: loginStaffMock.message,
      data: loginStaffMock.data.user as unknown as MeResponse["data"],
    };
  },

  getStaffMe: async (): Promise<StaffMeResponse> => {
    return staffMeMock as unknown as StaffMeResponse;
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },
};
