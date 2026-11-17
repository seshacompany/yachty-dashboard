import { Mail, Phone, User } from "lucide-react";
import { roleValue, statusValue } from "@/features/customers/data/tableData";
import { getRentalOwnerName, type RentalOwner } from "../../../types";
import { RentalDetailSectionCard } from "../../molecules/RentalDetailSectionCard";
import { RentalInfoRow } from "../../molecules/RentalInfoRow";

type RentalOwnerSectionProps = {
  owner?: RentalOwner | null;
};

export function RentalOwnerSection({ owner }: RentalOwnerSectionProps) {
  if (!owner) return null;

  return (
    <RentalDetailSectionCard title="بيانات صاحب المركب" icon={User}>
      <div className="flex flex-col">
        <RentalInfoRow title="الاسم" value={getRentalOwnerName(owner)} />
        <RentalInfoRow
          title="البريد الإلكتروني"
          value={<span dir="ltr">{owner.email}</span>}
          icon={<Mail className="size-3.5" />}
        />
        <RentalInfoRow
          title="رقم الهاتف"
          value={<span dir="ltr">{owner.phone || "غير متوفر"}</span>}
          icon={<Phone className="size-3.5" />}
        />
        <RentalInfoRow
          title="نوع الحساب"
          value={roleValue[owner.role] || owner.role}
        />
        <RentalInfoRow
          title="حالة الحساب"
          value={statusValue[owner.status] || owner.status}
        />
      </div>
    </RentalDetailSectionCard>
  );
}
