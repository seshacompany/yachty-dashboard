import { roleValue, statusValue } from "@/features/customers/data/tableData";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { WhatsappIcon } from "@/shared/icons/WhatsappIcon";
import type { TableRow } from "@/types/typesLayouts";
import { EditOneCustomer } from "./EditOneCustomer";
import { OneItemCustomers } from "./OneItemCustomers";

type DetailsCustomersProps = {
  row: TableRow;
};

export function DetailsOneCustomer({ row }: DetailsCustomersProps) {
  const date = formatDateToDDMMYYYY(String(row["created_at"] ?? row["createdAt"] ?? ""));
  const phone = String(row["phone"] ?? "");

  return (
    <div dir="rtl" className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 pt-4 px-4">
        <p className="text-lg font-medium text-sidebar dark:text-white">معلومات التواصل</p>
        <div className="flex flex-col gap-1">
          <OneItemCustomers title="الاسم" value={String(row["fullName"] ?? row["email"] ?? "—")} />
          <OneItemCustomers
            title="البريد الالكتروني"
            value={String(row["email"] ?? "—")}
          />
          <OneItemCustomers
            title="رقم الهاتف"
            value={phone || "—"}
          />
          <OneItemCustomers
            title="نوع المستخدم"
            value={roleValue[String(row["role"] ?? "")] ?? String(row["role"] ?? "—")}
          />
          <OneItemCustomers title="تاريخ الانضمام" value={date} />
          <OneItemCustomers
            title="الحالة"
            value={statusValue[String(row["status"] ?? "")] ?? String(row["status"] ?? "—")}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
        <EditOneCustomer data={row} />
        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-md p-2 cursor-pointer flex justify-center gap-1 transition-colors"
        >
          <WhatsappIcon className="relative w-8" />
          <p>التواصل عبر واتساب</p>
        </a>
      </div>
    </div>
  );
}
