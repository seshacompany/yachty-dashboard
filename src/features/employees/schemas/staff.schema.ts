import { z } from "zod";
import { STAFF_PERMISSIONS } from "../types/staff.types";

export { STAFF_PERMISSIONS };

export const createStaffSchema = z.object({
  staff_name: z.string().trim().min(2, "الاسم مطلوب (حرفين على الأقل)"),
  email: z.string().trim().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  phone: z.string().trim().min(1, "رقم الهاتف مطلوب"),
  jobTitle: z.string().trim().min(1, "المسمى الوظيفي مطلوب"),
  permissions: z
    .array(z.enum(STAFF_PERMISSIONS))
    .min(1, "يجب تحديد صلاحية واحدة على الأقل"),
});

export const updateStaffSchema = z.object({
  staff_name: z.string().trim().min(2, "الاسم مطلوب (حرفين على الأقل)"),
  phone: z.string().trim().min(1, "رقم الهاتف مطلوب"),
  jobTitle: z.string().trim().min(1, "المسمى الوظيفي مطلوب"),
  permissions: z
    .array(z.enum(STAFF_PERMISSIONS))
    .min(1, "يجب تحديد صلاحية واحدة على الأقل"),
});

export type CreateStaffFormValues = z.infer<typeof createStaffSchema>;
export type UpdateStaffFormValues = z.infer<typeof updateStaffSchema>;
