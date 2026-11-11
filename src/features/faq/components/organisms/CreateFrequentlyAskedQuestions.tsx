import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FormCreateFrequentlyAskedQuestions } from "../molecules/FormCreateFrequentlyAskedQuestions";

export function CreateFrequentlyAskedQuestions() {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title="أضافة سؤال جديد"
      classNameContent="p-4 flex-nowrap flex justify-center items-center gap-1 bg-primary text-white rounded-lg flex nowrap"
      open={open}
      onOpenChange={setOpen}
      content={
        <>
          <Plus size={20} />
          <p className="text-nowrap">
            إضافة سؤال جديد
          </p>
        </>
      }
    >
      <FormCreateFrequentlyAskedQuestions onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
