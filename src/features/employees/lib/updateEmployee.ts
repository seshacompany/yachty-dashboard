import { api } from "@/lib/axios";
import type { Employee } from "../types";

const allowedFields = [
  "employee_name",
  "email",
  "password",
  "area",
  "job_title",
  "status",
  "phone_number",
  "sales_requests",
  "purchase_requests",
  "developer_requests",
  "rental_requests",
  "consultation_requests",
  "installment_requests",
] as const;

export const updateEmployee = async (
  id: string,
  oldData: Employee,
  newData: Partial<Employee>,
) => {
  const merged: Employee = { ...oldData, ...newData };

  const filteredData = Object.fromEntries(
    Object.entries(merged).filter(([key]) =>
      allowedFields.includes(key as (typeof allowedFields)[number]),
    ),
  );

  const { data } = await api.patch(`/staff/${id}`, filteredData);
  return data;
};
