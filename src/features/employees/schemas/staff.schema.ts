import { z } from "zod";

import {
  STAFF_PERMISSIONS,
  STAFF_STATUSES,
  GENDERS,
} from "../types/staff.types";

export { STAFF_PERMISSIONS, STAFF_STATUSES, GENDERS };

export const createStaffSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول مطلوب"),
  lastName: z.string().min(2, "اسم العائلة مطلوب"),
  email: z
    .string()
    .email("البريد الإلكتروني غير صحيح")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  status: z.enum(STAFF_STATUSES),
  gender: z.enum(GENDERS, { message: "يرجى تحديد الجنس" }),
  jobTitle: z.string().optional().or(z.literal("")),
  permissions: z
    .array(z.enum(STAFF_PERMISSIONS))
    .min(1, "يجب تحديد صلاحية واحدة على الأقل"),
});

export const updateStaffSchema = createStaffSchema.omit({ password: true });

export type CreateStaffFormValues = z.infer<typeof createStaffSchema>;
export type UpdateStaffFormValues = z.infer<typeof updateStaffSchema>;
