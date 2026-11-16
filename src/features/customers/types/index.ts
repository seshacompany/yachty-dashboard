export type UserRole = "user" | "company" | "admin";

export type AdminType = "admin" | "staff";

export type UserStatus = "pending" | "approved" | "rejected" | "suspended";

export type UserProfile = {
  full_name: string;
  address: string | null;
  identity_documents_submitted: boolean;
};

export type UserCompany = {
  company_name: string;
  registration_number: string | null;
  address: string | null;
  identity_documents_submitted: boolean;
};

export type UserItem = {
  id: string;
  role: UserRole | string;
  admin_type: AdminType | string | null;
  email: string;
  phone: string | null;
  status: UserStatus | string;
  email_verified: boolean;
  email_verified_at: string | null;
  approved_at: string | null;
  suspended_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  profile: UserProfile | null;
  company: UserCompany | null;
};

export type UsersMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export type UsersResponse = {
  success: boolean;
  message: string;
  data: UserItem[];
  meta: UsersMeta;
};

export type GetUsersParams = {
  page?: number;
  limit?: number;
  email?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  fromDate?: string;
  toDate?: string;
};

export type UpdateUserStatusRequest = {
  status: UserStatus;
};

export type UpdateUserStatusResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

export type RestoreUserResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

export function getUserDisplayName(user: UserItem): string {
  if (user.role === "company" && user.company?.company_name) {
    return user.company.company_name;
  }
  if (user.profile?.full_name) {
    return user.profile.full_name;
  }
  if (user.email) {
    return user.email.split("@")[0] || user.email;
  }
  return user.admin_type || "—";
}
