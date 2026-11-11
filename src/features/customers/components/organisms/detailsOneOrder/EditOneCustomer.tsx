import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import type { TableRow } from "@/types/typesLayouts";
import { useState } from "react";
import { FormEditOne } from "./FormEditOne";

type EditOneCustomerProps = {
  data: TableRow;
};

export function EditOneCustomer({ data }: EditOneCustomerProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title={`تعديل العميل `}
      open={open}
      onOpenChange={setOpen}
      classNameContent="text-sidebar dark:text-white"
      content={
        <>
          <button type="submit" className="w-full cursor-pointer p-2">
            تعديل العميل
          </button>
        </>
      }
    >
      <FormEditOne data={data} onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
