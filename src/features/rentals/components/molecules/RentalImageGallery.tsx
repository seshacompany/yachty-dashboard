import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { RentalMedia } from "../../types";
import { RentalDetailSectionCard } from "./RentalDetailSectionCard";

type RentalImageGalleryProps = {
  title: string;
  icon: LucideIcon;
  images: RentalMedia[];
  altPrefix: string;
  emptyMessage: string;
  headerRight?: ReactNode;
};

export function RentalImageGallery({
  title,
  icon,
  images,
  altPrefix,
  emptyMessage,
  headerRight,
}: RentalImageGalleryProps) {
  return (
    <RentalDetailSectionCard
      title={title}
      icon={icon}
      headerRight={headerRight}
    >
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, index) => (
            <a
              key={img.public_id}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden border border-sidebar/15 dark:border-white/10 aspect-video bg-muted hover:opacity-90 transition-opacity"
            >
              <img
                src={img.url}
                alt={`${altPrefix} ${index + 1}`}
                className="size-full object-cover"
              />
            </a>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">{emptyMessage}</p>
      )}
    </RentalDetailSectionCard>
  );
}
