import { cn } from "@/lib/utils";

type oneCartPurchaseOrdersProps = {
  title: string;
  value: number;
  colorClass?: string;
};

export function OneCartPurchaseOrders({
  title,
  value,
  colorClass = "text-white",
}: oneCartPurchaseOrdersProps) {
  return (
    <div className="border border-solid border-sidebar/40 dark:border-white/20 p-4 rounded-xl flex flex-col gap-2">
      <p className="text-secondary-light">{title}</p>
      <p className={cn("text-xl", colorClass)}>{value}</p>
    </div>
  );
}
