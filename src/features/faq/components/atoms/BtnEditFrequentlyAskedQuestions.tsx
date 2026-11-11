import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import type { frequentlyAskedQuestionsItemType } from "../../types";
import { FormEditFrequentlyAskedQuestions } from "../molecules/FormEditFrequentlyAskedQuestions";

type BtnEditFrequentlyAskedQuestionsProps = {
  data: frequentlyAskedQuestionsItemType;
};

export function BtnEditFrequentlyAskedQuestions({ data }: BtnEditFrequentlyAskedQuestionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title={`تعديل السؤال`}
      classNameContent="p-3 px-3 flex-nowrap flex justify-center items-center gap-1 bg-card text-white rounded-lg text-sm flex nowrap bg-primary"
      open={open}
      onOpenChange={setOpen}
      content={
        <>
          <Edit2 size={15} className="text-white" />
        </>
      }
    >
      <FormEditFrequentlyAskedQuestions data={data} onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
