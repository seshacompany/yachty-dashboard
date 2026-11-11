import { Building2, CheckCircle, Search, Users } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/lib/utils";
import { useUserStats } from "../../hooks/useUserStats";

export function CartsCustomers() {
  const { data: stats, isLoading } = useUserStats();

  const cards = [
    {
      title: "إجمالي المستخدمين",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      colorClass: "text-primary bg-primary/15",
    },
    {
      title: "الباحثين عن سكن",
      value: stats?.seekerUsers ?? 0,
      icon: Search,
      colorClass: "text-info bg-info/15",
    },
    {
      title: "أصحاب السكن",
      value: stats?.ownerUsers ?? 0,
      icon: Building2,
      colorClass: "text-purple bg-purple/15",
    },
    {
      title: "العملاء النشطون",
      value: stats?.activeUsers ?? 0,
      icon: CheckCircle,
      colorClass: "text-success bg-success/15",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-popover-dark/40 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="size-10 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-xl border border-sidebar/20 dark:border-white/10 bg-card dark:bg-popover-dark/40 flex flex-col gap-2 transition-all hover:border-sidebar/40 dark:hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "p-2.5 rounded-lg flex items-center justify-center",
                  card.colorClass
                )}
              >
                <Icon className="size-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-sidebar/70 dark:text-white/60">
              {card.title}
            </p>
            <p className="text-2xl font-bold text-sidebar dark:text-white">
              {card.value.toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}