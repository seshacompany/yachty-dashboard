export type UserRole = "SEEKER" | "OWNER" | "ADMIN";

export type UserStatus = "PENDING" | "ACTIVE" | "SUSPENDED";

export type UserGender = "MALE" | "FEMALE";

export type SortOrder = "ASC" | "DESC";

export type UserItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  gender: UserGender | string;
  role: UserRole | string;
  status: UserStatus | string;
  avatarUrl: string | null;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UsersMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type UsersData = {
  items: UserItem[];
  meta: UsersMeta;
};

export type UsersResponse = {
  success: boolean;
  message: string;
  data: UsersData;
};

export type GetUsersParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  role?: UserRole;
  status?: UserStatus;
  email?: string;
};

export type UpdateUserStatusRequest = {
  status: "ACTIVE" | "SUSPENDED";
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

export type UserStatistics = {
  totalUsers: number;
  seekerUsers: number;
  ownerUsers: number;
  activeUsers: number;
};

export type StudentInformation = {
  university: string;
  faculty: string;
  academicYear: string;
};

export type GraduateInformation = {
  jobTitle: string;
  educationLevel: string;
};

export type EmployeeNote = {
  note: string;
  createdAt: string;
};

export type CustomerDetails = {
  id: string;
  fullName: string;
  governorate: string;
  gender: string;
  category: string;
  email: string;
  phone: string;
  status: string;
  studentInformation: StudentInformation | null;
  graduateInformation: GraduateInformation | null;
  employeeNotes: EmployeeNote[];
  createdAt: string;
  updatedAt: string;
};

export type requestBuyType = {
  id: string;
  client_name: string;
  national_id: string;
  phone_number: string;
  purpose: string;
  area: string;
  unit_type: string;
  status: string;
  created_at: string;
  updated_at: string;
};
