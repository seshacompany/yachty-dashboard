import { genderValue, statusValue } from "@/features/customers/data/tableData";
import type { EmployeeNote, GraduateInformation, StudentInformation } from "@/features/customers/types";
import { formatDateToDDMMYYYY } from "@/lib/formatDate";
import { WhatsappIcon } from "@/shared/icons/WhatsappIcon";
import type { TableRow } from "@/types/typesLayouts";
import { EditOneCustomer } from "./EditOneCustomer";
import { OneItemCustomers } from "./OneItemCustomers";

type DetailsCustomersProps = {
  row: TableRow;
};

export function DetailsOneCustomer({ row }: DetailsCustomersProps) {
  const date = formatDateToDDMMYYYY(`${row["createdAt"]}`);
  const student = row.studentInformation as StudentInformation | null;
  const graduate = row.graduateInformation as GraduateInformation | null;
  const employeeNotes = row.employeeNotes as EmployeeNote[] | null;

  return (
    <div dir="rtl" className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 pt-4 px-4">
        <p className="text-lg font-medium text-sidebar dark:text-white">معلومات التواصل</p>
        <div className="flex flex-col gap-1">
          <OneItemCustomers title="الاسم" value={`${row["fullName"]}`} />
          <OneItemCustomers
            title="البريد الالكتروني"
            value={`${row["email"]}`}
          />
          <OneItemCustomers
            title="رقم الهاتف"
            value={`${row["phone"]}`}
          />
          <OneItemCustomers title="النوع" value={genderValue[`${row["gender"]}`]} />
          <OneItemCustomers title="المحافظة" value={`${row["governorate"]}`} />
          <OneItemCustomers title="تاريخ الانضمام" value={date} />
          <OneItemCustomers
            title="الحالة"
            value={statusValue[`${row["status"]}`]}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <p className="text-lg font-medium text-sidebar dark:text-white">تفاصيل العميل</p>
        <div className="flex flex-col gap-1">
          {row.category === "student" && row.studentInformation && (
            <>
              <OneItemCustomers
                title="الجامعة"
                value={student?.university ?? ""}
              />
              <OneItemCustomers
                title="الكلية"
                value={student?.faculty ?? ""}
              />
              <OneItemCustomers
                title="السنة الدراسية"
                value={student?.academicYear ?? ""}
              />
            </>
          )}

          {row.category === "graduate" && row.graduateInformation && (
            <>
              <OneItemCustomers
                title="المسمى الوظيفي"
                value={graduate?.jobTitle ?? ""}
              />
              <OneItemCustomers
                title="المؤهل الدراسي"
                value={graduate?.educationLevel ?? ""}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <p className="text-lg font-medium text-sidebar dark:text-white">ملاحظات الموظفين</p>

        {employeeNotes?.length ? (
          <div className="flex flex-col gap-2">
            {employeeNotes.map((note, index) => {
              const date = formatDateToDDMMYYYY(note.createdAt);
              return (
                <div key={index} className="text-sm bg-sidebar text-white flex justify-between items-center rounded-xl p-2">
                  <p>
                    {note.note}
                  </p>
                  <p>
                    {date}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="bg-sidebar text-white p-2 rounded-xl text-sm">
            لا يوجد ملاحظات
          </p>
        )}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 p-4">
        <EditOneCustomer data={row} />
        <a
          href={`https://wa.me/${row["phone_number"]}`}
          target="_blank"
          className="flex-1 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-md p-2 cursor-pointer flex justify-center gap-1 transition-colors"
        >
          <WhatsappIcon className="relative w-8" />
          <p>التواصل عبر واتساب</p>
        </a>
      </div>
    </div>
  );
}
