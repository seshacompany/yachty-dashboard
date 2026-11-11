import type { CreateStaffFormValues } from "../schemas/staff.schema";
import type { StaffItem } from "./staff.types";

export * from "./staff.types";

export type Employee = StaffItem;
export type TableRow = StaffItem;
export type FormValues = CreateStaffFormValues;