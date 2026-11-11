import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type oneCartEmployeesProps = {
  title: string,
  value: number,
  Icon: LucideIcon,
  type: "percent" | "number",
}

export function OneCartEmployees({ title, value, Icon, type }: oneCartEmployeesProps) {
  return (
    <div className="border border-solid border-sidebar/40 dark:border-white/20 p-4 rounded-xl flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className={cn(
          "text-xl p-2 rounded-xl",
          title == "إجمالي الموظفين" ?
            "text-success bg-success/50" :
            title == "موظفين نشطين" ?
              "text-success bg-success/50" :
              title == "موظفين موقفون" ?
                "text-primary bg-primary/50" :
                "text-cyan bg-cyan/50"
        )}>
          <Icon />
        </div>
        <p className="text-secondary-light">
          {title}
        </p>
      </div>
      <p className={cn(
        "text-xl pr-1",
        title == "إجمالي الموظفين" ?
          "text-success" :
          title == "موظفين نشطين" ?
            "text-success" :
            title == "موظفين موقفون" ?
              "text-primary" :
              "text-cyan"
      )}>
        {type == "number" ? value : value.toString().concat("%")}
      </p>
    </div>
  );
}
