import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormCreateTermsConditions } from "../molecules/FormCreateTermsConditions";

export function CreateTermsConditions() {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title="أضافة شرط جديد"
      classNameContent="p-2 px-4 flex-nowrap flex justify-center items-center gap-1 bg-primary text-white rounded-lg flex nowrap"
      open={open}
      onOpenChange={setOpen}
      content={
        <>
          <Plus size={20} />
          <p className="text-nowrap">
            إضافة شرط جديد
          </p>
        </>
      }
    >
      <FormCreateTermsConditions onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
