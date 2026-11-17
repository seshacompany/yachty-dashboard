import { Anchor } from "lucide-react";
import type { RentalItem } from "../../../types";
import { RentalDetailSectionCard } from "../../molecules/RentalDetailSectionCard";
import { RentalInfoRow } from "../../molecules/RentalInfoRow";

type RentalSpecsSectionProps = {
  rental: RentalItem;
};

export function RentalSpecsSection({ rental }: RentalSpecsSectionProps) {
  return (
    <RentalDetailSectionCard title="مواصفات المركب" icon={Anchor}>
      <div className="flex flex-col">
        <RentalInfoRow title="نوع المركب" value={rental.boat_type || "—"} />
        <RentalInfoRow title="الماركة" value={rental.brand || "—"} />
        <RentalInfoRow title="الموديل" value={rental.model || "—"} />
        <RentalInfoRow title="سنة الصنع" value={rental.year_built ?? "—"} />
        <RentalInfoRow
          title="الطول"
          value={rental.length_ft ? `${rental.length_ft} قدم` : "—"}
        />
        <RentalInfoRow
          title="أقصى عدد للركاب"
          value={rental.max_passengers ?? "—"}
        />
        <RentalInfoRow title="عدد المحركات" value={rental.engine_count ?? "—"} />
        <RentalInfoRow
          title="قوة المحرك"
          value={
            rental.horsepower_per_engine
              ? `${rental.horsepower_per_engine} حصان`
              : "—"
          }
        />
        <RentalInfoRow
          title="السرعة البحرية"
          value={
            rental.cruising_speed_knots
              ? `${rental.cruising_speed_knots} عقدة`
              : "—"
          }
        />
        <RentalInfoRow title="الكبائن" value={rental.cabins ?? "—"} />
        <RentalInfoRow title="دورات المياه" value={rental.heads ?? "—"} />
      </div>

      {Array.isArray(rental.equipment_features) &&
        rental.equipment_features.length > 0 && (
          <div className="pt-2 border-t border-sidebar/10 dark:border-white/10 flex flex-col gap-2">
            <span className="text-xs text-sidebar/70 dark:text-white/60">
              التجهيزات والمميزات:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {rental.equipment_features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
    </RentalDetailSectionCard>
  );
}
