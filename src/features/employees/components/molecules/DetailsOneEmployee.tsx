import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { DialogClose } from "@/ui/dialog";
import { Eye, MessageCircle } from "lucide-react";
import type { TableRow } from "../../types";
import { OneItemDetailsConnectionEmployee } from "./OneItemDetailsConnectionEmployee";
import { PerformanceStatisticsDetailsOneEmployee } from "./PerformanceStatisticsDetailsOneEmployee";
import { PowersOneEmployee } from "./PowersOneEmployee";

type DetailsOneEmployeeProps = {
  row: TableRow;
};

export function DetailsOneEmployee({ row }: DetailsOneEmployeeProps) {
  const date = formatDateToDDMMYYYY("2026-04-28T12:21:32.994Z");
  const employeeName = row.employee_name || `${row.firstName || ""} ${row.lastName || ""}`.trim() || "موظف";
  const initial = employeeName[0] || "M";
  const jobTitle = row.job_title || row.jobTitle || "موظف";
  const email = row.email || "—";
  const phone = row.phone_number || row.phone || "—";

  return (
    <PopUpLayout
      title="تفاصيل الموظف"
      content={
        <div className="bg-primary/50 p-2 rounded-xl text-primary">
          <Eye size={18} />
        </div>
      }
    >
      <div dir="rtl" className="flex flex-col gap-4">
        <div className="flex gap-3 items-center pt-4 px-4">
          <div className="bg-primary/20 text-primary rounded-full w-12 h-12 flex justify-center items-center font-bold">
            <p>{initial}</p>
          </div>
          <div>
            <p className="text-sidebar dark:text-white">
              {employeeName}
            </p>
            <p className="text-sm text-secondary-light">
              {jobTitle}
            </p>
          </div>
        </div>
        <div className="w-full px-4 flex flex-col gap-2">
          <p className="text-lg font-medium">معلومات الاتصال</p>
          <div className="w-full flex flex-col gap-1 text-sm">
            <OneItemDetailsConnectionEmployee
              title="البريد الإلكتروني:"
              value={email}
            />
            <OneItemDetailsConnectionEmployee
              title="رقم الهاتف:"
              value={phone}
            />
            <OneItemDetailsConnectionEmployee
              title="تاريخ الانضمام:"
              value={date}
            />
          </div>
        </div>
        <PerformanceStatisticsDetailsOneEmployee row={row} />
        <PowersOneEmployee row={row} />
        <div className="flex md:flex-row flex-col gap-4 p-4">
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex gap-1 items-center justify-center bg-whatsapp hover:bg-whatsapp/90 text-white rounded-md p-2 cursor-pointer transition-colors"
          >
            <MessageCircle />
            <p>التواصل عبر الواتساب</p>
          </a>

          <DialogClose asChild>
            <button type="button" className="flex-1 cursor-pointer p-2 text-sidebar dark:text-white">
              إلغاء
            </button>
          </DialogClose>
        </div>
      </div>
    </PopUpLayout>
  );
}
