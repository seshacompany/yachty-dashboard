import { Banknote, MapPin } from "lucide-react";
import type { RentalItem } from "../../../types";
import { RentalBooleanBadge } from "../../atoms/RentalBooleanBadge";
import { RentalDetailSectionCard } from "../../molecules/RentalDetailSectionCard";
import { RentalInfoRow } from "../../molecules/RentalInfoRow";

type RentalPricingSectionProps = {
  rental: RentalItem;
};

export function RentalPricingSection({ rental }: RentalPricingSectionProps) {
  return (
    <RentalDetailSectionCard title="الموقع والأسعار والشروط" icon={Banknote}>
      <div className="flex flex-col">
        <RentalInfoRow
          title="الموقع"
          value={rental.location || "—"}
          icon={<MapPin className="size-3.5" />}
        />
        <RentalInfoRow
          title="نقطة الانطلاق"
          value={rental.departure_point || "—"}
        />
        <RentalInfoRow
          title="السعر اليومي"
          value={
            rental.daily_price !== undefined
              ? `${rental.daily_price.toLocaleString()} ${rental.currency || ""}`
              : "—"
          }
        />
        <RentalInfoRow
          title="شامل القبطان"
          value={<RentalBooleanBadge value={rental.captain_included} />}
        />
        <RentalInfoRow
          title="شامل الوقود"
          value={<RentalBooleanBadge value={rental.fuel_included} />}
        />
        <RentalInfoRow title="نوع التأمين" value={rental.deposit_type || "—"} />
        <RentalInfoRow
          title="قيمة التأمين"
          value={
            rental.deposit_value !== null && rental.deposit_value !== undefined
              ? `${rental.deposit_value.toLocaleString()} ${rental.deposit_currency || ""}`
              : "—"
          }
        />
      </div>

      {rental.description && (
        <div className="pt-2 border-t border-sidebar/10 dark:border-white/10 flex flex-col gap-1">
          <span className="text-xs text-sidebar/70 dark:text-white/60">
            الوصف:
          </span>
          <p className="text-xs text-sidebar dark:text-white/90 leading-relaxed">
            {rental.description}
          </p>
        </div>
      )}
    </RentalDetailSectionCard>
  );
}
