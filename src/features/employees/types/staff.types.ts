export const STAFF_STATUSES = ["approved", "suspended"] as const;
export type StaffStatus = (typeof STAFF_STATUSES)[number];

export const STAFF_PERMISSIONS = [
  "users",
  "staff",
  "notifications",
  "boat_sales",
  "rentals",
] as const;

export type StaffPermission = (typeof STAFF_PERMISSIONS)[number];

export const STAFF_PERMISSION_LABELS: Record<StaffPermission, string> = {
  users: "إدارة المستخدمين",
  staff: "إدارة الموظفين",
  notifications: "الإشعارات",
  boat_sales: "مبيعات اليخوت",
  rentals: "إيجارات اليخوت",
};

export const STAFF_STATUS_LABELS: Record<StaffStatus, string> = {
  approved: "نشط",
  suspended: "موقوف",
};

export interface StaffItem {
  id: string;
  email: string;
  phone: string | null;
  role: string;
  admin_type: string;
  status: StaffStatus;
  staff_name: string;
  jobTitle: string | null;
  permissions: StaffPermission[];
  email_verified_at: string | null;
  approved_at: string | null;
  suspended_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface StaffResponse {
  success: boolean;
  message: string;
  data: StaffItem[];
  meta: PaginationMeta;
}

export interface StaffSingleResponse {
  success: boolean;
  message: string;
  data: StaffItem;
}

export interface StaffMeResponse {
  success: boolean;
  message: string;
  data: StaffItem;
}

export interface StaffActionResponse {
  success: boolean;
  message: string;
  data?: StaffItem;
}

export interface CreateStaffPayload {
  staff_name: string;
  email: string;
  password: string;
  phone: string;
  jobTitle: string;
  permissions: StaffPermission[];
}

export interface UpdateStaffPayload {
  staff_name: string;
  phone: string;
  jobTitle: string;
  permissions: StaffPermission[];
}

export interface UpdateStaffStatusPayload {
  status: StaffStatus;
}

export interface StaffQueryParams {
  staff_name?: string;
  email?: string;
  jobTitle?: string;
  status?: StaffStatus;
  page?: number;
  limit?: number;
}
