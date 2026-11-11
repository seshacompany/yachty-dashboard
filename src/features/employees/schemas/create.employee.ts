import { z } from "zod";
import { updateEmployeeSchema } from "./update.employee";

export const createEmployeeSchema = updateEmployeeSchema.extend({
  password: z.string().min(6, "كلمة المرور يجب ألا تقل عن 6 أحرف"),
})

export type CreateEmployeeType = z.infer<typeof createEmployeeSchema>;
