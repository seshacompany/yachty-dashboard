import type { StaffPermission } from "@/features/employees/types";

export interface User {
  id: string;
  role: string;
  admin_type: string | null;
  email: string;
  phone: string | null;
  status: string;
  email_verified: boolean;
  email_verified_at: string | null;
  approved_at: string | null;
  suspended_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  profile: Record<string, unknown> | null;
  company: Record<string, unknown> | null;
  adminType?: "ADMIN" | "STAFF" | string | null;
  jobTitle?: string | null;
  permissions?: StaffPermission[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface RefreshPayload {
  refresh_token: string;
}

export interface RefreshResponseData {
  access_token: string;
  refresh_token?: string;
  user?: User;
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: RefreshResponseData;
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface RequestOtpPayload {
  email: string;
}

export interface RequestOtpResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    reset_token: string;
  };
}

export interface ResetPasswordPayload {
  reset_token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data?: null;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  accessTokenExpiresAt: number | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}
