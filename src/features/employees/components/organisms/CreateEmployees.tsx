import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormCreateEmployee } from "../molecules/FormCreateEmployee";

export function CreateEmployees() {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title="إضافة موظف جديد"
      classNameContent="p-2 flex justify-center items-end gap-1 bg-primary text-white rounded-lg flex nowrap"
      open={open}
      onOpenChange={setOpen}
      content={
        <>
          <Plus size={20} />
          <p>
            موظف جديد
          </p>
        </>
      }
    >
      <FormCreateEmployee onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
