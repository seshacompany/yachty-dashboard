import { z } from "zod";

export const updateEmployeeSchema = z.object({
  employee_name: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().split(/\s+/).length >= 2, {
      message: "يجب إدخال اسم ثنائي (الاسم الأول + الأخير)",
    }),

  email: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 5, {
      message: "البريد الإلكتروني قصير جدًا",
    })
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "البريد الإلكتروني غير صحيح",
    }),

  area: z.string().optional(),

  job_title: z.string().optional(),

  status: z
    .string()
    .optional()
    .refine((val) => !val || ["active", "inactive"].includes(val), {
      message: "الحالة غير صحيحة",
    }),

  phone_number: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 9, {
      message: "رقم الهاتف قصير",
    })
    .refine((val) => !val || /^(\+966|00966|966|0)?[1-9][0-9]{8}$/.test(val), {
      message: "رقم الهاتف غير صحيح",
    }),

  customers: z.boolean(),
  unity_owners: z.boolean(),
  units: z.boolean(),
  advertisements: z.boolean(),
  payments: z.boolean(),
  content: z.boolean(),
  messages: z.boolean(),
  frequently_asked_questions: z.boolean(),
  terms_and_conditions: z.boolean(),
  reviews: z.boolean(),
  employees: z.boolean(),
  real_estate: z.boolean(),
});

export type UpdateEmployeeType = z.infer<typeof updateEmployeeSchema>;
