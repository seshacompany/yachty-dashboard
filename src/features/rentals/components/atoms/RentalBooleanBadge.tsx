import { CheckCircle2, XCircle } from "lucide-react";

type RentalBooleanBadgeProps = {
  value: boolean;
  trueLabel?: string;
  falseLabel?: string;
};

export function RentalBooleanBadge({
  value,
  trueLabel = "نعم",
  falseLabel = "لا",
}: RentalBooleanBadgeProps) {
  if (value) {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
        <CheckCircle2 className="size-3.5" aria-hidden />
        <span>{trueLabel}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
      <XCircle className="size-3.5" aria-hidden />
      <span>{falseLabel}</span>
    </span>
  );
}
