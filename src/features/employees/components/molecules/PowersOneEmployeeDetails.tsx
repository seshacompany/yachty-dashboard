import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

type PowersOneEmployeeDetailsProps = {
  title: string;
  value: string | number | boolean;
};

export function PowersOneEmployeeDetails({ title, value }: PowersOneEmployeeDetailsProps) {
  return (
    <div
      className={cn(
        "rounded-md flex justify-between p-2",
        value ? "bg-success dark:bg-success/20" : "bg-primary/20"
      )}
    >
      <p>{title}</p>

      {value ? (
        <CheckCircle className="text-white dark:text-success" />
      ) : (
        <XCircle className="text-danger" />
      )}
    </div>
  );
}
