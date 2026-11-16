import { z } from "zod";

export const updateEmployeeSchema = z.object({
  staff_name: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length >= 2, {
      message: "الاسم يجب أن يكون حرفين على الأقل",
    }),

  email: z
    .string()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "البريد الإلكتروني غير صحيح",
    }),

  jobTitle: z.string().optional(),

  status: z
    .enum(["approved", "suspended"])
    .optional(),

  phone: z.string().optional(),

  users: z.boolean(),
  staff: z.boolean(),
  notifications: z.boolean(),
  boat_sales: z.boolean(),
  rentals: z.boolean(),
});

export type UpdateEmployeeType = z.infer<typeof updateEmployeeSchema>;
