import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type RentalDetailSectionCardProps = {
  title: string;
  icon: LucideIcon;
  headerRight?: ReactNode;
  children: ReactNode;
};

export function RentalDetailSectionCard({
  title,
  icon: Icon,
  headerRight,
  children,
}: RentalDetailSectionCardProps) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/30 dark:bg-popover-dark/30 border border-sidebar/15 dark:border-white/10">
      <div className="flex items-center justify-between pb-2 border-b border-sidebar/15 dark:border-white/10">
        <div className="flex items-center gap-2 font-bold text-sm text-primary">
          <Icon className="size-4" aria-hidden />
          <span>{title}</span>
        </div>
        {headerRight}
      </div>
      {children}
    </div>
  );
}
