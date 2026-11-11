import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Edit } from "lucide-react";
import { useState } from "react";
import type { Employee } from "../../types";
import { FormEditEmployee } from "./FormEditEmployee";

type EditEmployeeProps = {
  row: Employee;
};

export function EditEmployee({ row }: EditEmployeeProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title="تعديل بيانات الموظف"
      open={open}
      onOpenChange={setOpen}
      content={
        <div className="bg-success/50 p-2 rounded-xl text-success">
          <Edit size={18} />
        </div>
      }
    >
      <FormEditEmployee row={row} onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
