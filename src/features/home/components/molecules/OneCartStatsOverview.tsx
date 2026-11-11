import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

type OneCartStatsOverviewProps = {
  Icon: LucideIcon,
  value: number,
  title: string,
  type: "win" | "lose",
  percentage: number,
  className?: string
};

export function OneCartStatsOverview({ Icon, percentage, title, type, value, className }: OneCartStatsOverviewProps) {
  return (
    <div className="bg-card dark:bg-primary-dark transition-colors duration-300 ease-in-out p-4 border border-solid border-white/20 dark:bg-blend-darken rounded-xl flex flex-col gap-2">
      <div className="flex justify-between">
        <div className={cn(
          "p-3 flex justify-center items-center rounded-lg text-amber-600 bg-amber-600/15",
          className
        )}>
          <Icon />
        </div>
        <div className={`flex items-center gap-1 ${type == "win" ? "text-trending-up-color" : "text-trending-down-color"}`}>
          {type == "win" ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <p>
            {percentage.toString().concat("%", type == "win" ? "+" : "-")}
          </p>
        </div>
      </div>
      <p className="text-sidebar/30 dark:text-white/60 transition duration-300 ease-in-out">
        {value.toLocaleString()}
      </p>
      <p className="font-bold text-lg text-sidebar/90 dark:text-white/90 transition duration-300 ease-in-out">
        {title}
      </p>
      <p className="text-sm text-sidebar/60 dark:text-white/60 transition duration-300 ease-in-out">
        من الشهر الماضي
      </p>
    </div>
  );
}
