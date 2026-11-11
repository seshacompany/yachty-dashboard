import type { EmployeeNote, GraduateInformation, StudentInformation } from "@/features/customers/types";

export type TableRow = {
  id: string;
  [key: string]: string | number | boolean | StudentInformation | GraduateInformation | EmployeeNote[] | null;
};

export type TableHeader = {
  key: string;
  label: string;
};

export type notificationType = {
  isRead: boolean;
  id: string;
  content: string;
  title: string;
  createdAt: string;
};

export type optionType = {
  label: string;
  value: string;
};

export type DecodedToken = {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type AuthCheckResponse = {
  id: string;
  name: string;
  email: string;
  role: "employee" | "admin";
  createdAt: string;
  updatedAt: string;
  staff: Staff;
};

export type Staff = {
  id: string;
  employee_name: string;
  email: string;
  area: string;
  job_title: string;
  progress: string | null;
  status: string;

  sales_requests: boolean;
  purchase_requests: boolean;
  developer_requests: boolean;
  rental_requests: boolean;
  consultation_requests: boolean;
  installment_requests: boolean;

  phone_number: string;
  orders_number: number;
  av_time_res: number | null;
};
