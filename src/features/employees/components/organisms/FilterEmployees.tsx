import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type FilterEmployeesProps = {
  setShow: Dispatch<SetStateAction<boolean>>,
  show: boolean,
}


export function FilterEmployees({ setShow, show }: FilterEmployeesProps) {
  return (
    <div onClick={() => setShow(!show)} className={cn("md:flex-0 flex-1 flex justify-center items-center p-2 rounded-lg cursor-pointer transition-all duration-150", show ? "bg-primary/70 text-card" : "bg-primary text-white")}>
      <Filter />
    </div>
  );
}
