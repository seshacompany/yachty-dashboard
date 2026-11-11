import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import type { TicketItem } from "../../types";
import { OneItemDetailsMessage } from "./OneItemDetailsMessage";

type DetailsMessageProps = {
  data: TicketItem;
};

export function DetailsMessage({ data }: DetailsMessageProps) {
  const {
    userName,
    name,
    message,
    content,
    userEmail,
    email,
    subject,
    status,
    createdAt,
    userPhone,
    phone,
    updatedAt,
    ticketNumber,
  } = data;
  const createdAtDate = createdAt ? formatDateToDDMMYYYY(createdAt) : "-";
  const updatedAtDate = updatedAt ? formatDateToDDMMYYYY(updatedAt) : "-";

  return (
    <div dir="rtl" className="flex flex-col gap-3 p-4 max-h-lvh overflow-y-auto rounded-lg text-sidebar dark:text-white">
      {ticketNumber && <OneItemDetailsMessage title="رقم التذكرة" value={ticketNumber} />}
      <OneItemDetailsMessage title="الاسم" value={userName || name || ""} />
      <OneItemDetailsMessage title="البريد الإلكتروني" value={userEmail || email || ""} />
      <OneItemDetailsMessage title="رقم الهاتف" value={userPhone || phone || ""} />
      <OneItemDetailsMessage title="الموضوع" value={subject || ""} />
      <OneItemDetailsMessage title="المحتوى" value={message || content || ""} />
      <OneItemDetailsMessage title="الحالة" value={status} />
      <OneItemDetailsMessage title="تاريخ الإنشاء" value={createdAtDate} />
      <OneItemDetailsMessage title="تاريخ التحديث" value={updatedAtDate} />
    </div>
  );
}