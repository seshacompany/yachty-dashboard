import { z } from "zod";

export const updateStatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
});

export type UpdateStatusFormValues = z.infer<typeof updateStatusSchema>;

export const replyMessageSchema = z.object({
  channel: z.enum(["EMAIL", "WHATSAPP"]),
  message: z
    .string()
    .trim()
    .min(5, "يجب إدخال نص الرسالة (5 أحرف على الأقل)"),
});

export type ReplyMessageFormValues = z.infer<typeof replyMessageSchema>;
