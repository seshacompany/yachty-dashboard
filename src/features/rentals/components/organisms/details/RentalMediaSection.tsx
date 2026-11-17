import { AlertTriangle, FileCheck2, Images } from "lucide-react";
import type { RentalItem } from "../../../types";
import { RentalBooleanBadge } from "../../atoms/RentalBooleanBadge";
import { RentalImageGallery } from "../../molecules/RentalImageGallery";

type RentalMediaSectionProps = {
  rental: RentalItem;
};

export function RentalMediaSection({ rental }: RentalMediaSectionProps) {
  const mediaList = Array.isArray(rental.media) ? rental.media : [];
  const licenseList = Array.isArray(rental.boat_license_images)
    ? rental.boat_license_images
    : [];

  return (
    <div className="flex flex-col gap-4">
      {rental.rejection_reason && (
        <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 flex items-start gap-2.5 text-destructive text-sm">
          <AlertTriangle className="size-4.5 shrink-0 mt-0.5" aria-hidden />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-xs">سبب الرفض:</span>
            <p className="text-xs leading-relaxed">{rental.rejection_reason}</p>
          </div>
        </div>
      )}

      <RentalImageGallery
        title={`صور المركب (${mediaList.length})`}
        icon={Images}
        images={mediaList}
        altPrefix={`${rental.brand} ${rental.model}`}
        emptyMessage="لا توجد صور مرفقة"
      />

      <RentalImageGallery
        title="ترخيص المركب"
        icon={FileCheck2}
        images={licenseList}
        altPrefix="رخصة المركب"
        emptyMessage="لا توجد صور ترخيص مرفقة"
        headerRight={
          <RentalBooleanBadge
            value={rental.boat_license_images_submitted}
            trueLabel="تم تقديم الترخيص"
            falseLabel="لم يتم التقديم"
          />
        }
      />
    </div>
  );
}
