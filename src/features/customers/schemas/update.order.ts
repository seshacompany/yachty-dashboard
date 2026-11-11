import { z } from "zod";


const allowedStatuses = [
  "active",
  "inactive"
] as const;

export const updateOrderSchema = z.object({
  employee_note: z.string().optional(),
  status: z
    .string()
    .min(1, "الحالة مطلوبة")
    .refine(
      (val) =>
        allowedStatuses.includes(val as (typeof allowedStatuses)[number]),
      {
        message: "الحالة غير صحيحة",
      },
    ),
});

export type UpdateOrderType = z.infer<typeof updateOrderSchema>;
