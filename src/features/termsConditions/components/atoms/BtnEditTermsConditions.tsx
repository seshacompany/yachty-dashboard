import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import type { termsConditionsItemType } from "../../types";
import { FormEditTermsConditions } from "../molecules/FormEditTermsConditions";

type BtnEditTermsConditionsProps = {
  data: termsConditionsItemType;
};

export function BtnEditTermsConditions({ data }: BtnEditTermsConditionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title={`تعديل السؤال`}
      classNameContent="p-3 px-3 flex-nowrap flex justify-center items-center gap-1 bg-primary/80 hover:bg-primary text-white text-white rounded-lg text-sm flex nowrap"
      classNameChildren="bg-background dark:bg-card-dark"
      open={open}
      onOpenChange={setOpen}
      content={
        <>
          <Edit2 size={15} />
        </>
      }
    >
      <FormEditTermsConditions data={data} onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
