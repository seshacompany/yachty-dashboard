import type { StaffPermission } from "@/features/employees/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  gender: string;
  role: string;
  status: string;
  adminType: "ADMIN" | "STAFF" | string | null;
  avatarUrl: string | null;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  jobTitle?: string | null;
  permissions?: StaffPermission[];
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}

export interface RefreshPayload {
  refreshToken: string;
}

export interface RefreshResponseData {
  accessToken: string;
  refreshToken: string;
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

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
}
