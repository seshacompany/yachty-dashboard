import { cn } from "@/lib/utils";

type RentalInfoRowProps = {
  title: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export function RentalInfoRow({
  title,
  value,
  icon,
  className,
}: RentalInfoRowProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center gap-4 py-2 border-b border-sidebar/10 dark:border-white/5 last:border-0 text-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-sidebar/70 dark:text-white/60 shrink-0">
        {icon}
        <span>{title}</span>
      </div>
      <div className="font-medium text-sidebar dark:text-white text-left break-words">
        {value ?? "—"}
      </div>
    </div>
  );
}
