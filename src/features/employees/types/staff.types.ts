export const STAFF_STATUSES = ["PENDING", "ACTIVE", "SUSPENDED"] as const;
export type StaffStatus = (typeof STAFF_STATUSES)[number];

export const GENDERS = ["MALE", "FEMALE"] as const;
export type Gender = (typeof GENDERS)[number];

export type SortOrder = "ASC" | "DESC";

export const STAFF_PERMISSIONS = [
  "USERS",
  "OWNERS",
  "PLANS",
  "SUBSCRIPTIONS",
  "PAYMENTS",
  "PROPERTIES",
  "PROPERTY_REVIEWS",
  "OWNER_REVIEWS",
  "PLATFORM_REVIEWS",
  "OWNER_REPORTS",
  "SUPPORT_TICKETS",
  "FAQS",
  "TERMS_AND_CONDITIONS",
  "STAFF",
] as const;

export type StaffPermission = (typeof STAFF_PERMISSIONS)[number];

export const STAFF_PERMISSION_LABELS: Record<StaffPermission, string> = {
  USERS: "إدارة المستخدمين",
  OWNERS: "إدارة أصحاب السكن",
  PLANS: "إدارة الباقات",
  SUBSCRIPTIONS: "إدارة الاشتراكات",
  PAYMENTS: "إدارة المدفوعات",
  PROPERTIES: "إدارة الوحدات والعقارات",
  PROPERTY_REVIEWS: "تقييمات العقارات",
  OWNER_REVIEWS: "تقييمات أصحاب السكن",
  PLATFORM_REVIEWS: "تقييمات المنصة",
  OWNER_REPORTS: "بلاغات أصحاب السكن",
  SUPPORT_TICKETS: "تذاكر الدعم والرسائل",
  FAQS: "الأسئلة الشائعة",
  TERMS_AND_CONDITIONS: "الشروط والأحكام",
  STAFF: "إدارة الموظفين",
};

export const STAFF_STATUS_LABELS: Record<StaffStatus, string> = {
  ACTIVE: "نشط",
  PENDING: "معلق",
  SUSPENDED: "موقوف",
};

export const STAFF_GENDER_LABELS: Record<Gender, string> = {
  MALE: "ذكر",
  FEMALE: "أنثى",
};

export interface StaffItem {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  gender?: Gender;
  status?: StaffStatus | string;
  adminType?: "STAFF" | "ADMIN" | string;
  jobTitle?: string | null;
  permissions?: StaffPermission[];
  createdAt?: string;
  updatedAt?: string;

  // Legacy fields for backwards compatibility:
  employee_name?: string;
  phone_number?: string;
  job_title?: string;
  progress?: string;
  customers?: boolean;
  unity_owners?: boolean;
  units?: boolean;
  advertisements?: boolean;
  payments?: boolean;
  content?: boolean;
  messages?: boolean;
  frequently_asked_questions?: boolean;
  terms_and_conditions?: boolean;
  reviews?: boolean;
  employees?: boolean;
  real_estate?: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface StaffData {
  items: StaffItem[];
  meta: PaginationMeta;
}

export interface StaffResponse {
  success: boolean;
  message: string;
  data: StaffData;
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
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  password: string;
  status?: StaffStatus;
  gender: Gender;
  jobTitle?: string;
  permissions: StaffPermission[];
}

export type UpdateStaffPayload = Omit<CreateStaffPayload, "password">;

export interface StaffQueryParams {
  search?: string;
  status?: StaffStatus;
  jobTitle?: string;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}
