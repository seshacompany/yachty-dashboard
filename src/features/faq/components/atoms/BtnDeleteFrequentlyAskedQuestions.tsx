import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Trash } from "lucide-react";
import { useState } from "react";
import { ApproveDeleteItem } from "../molecules/ApproveDeleteItem";

type BtnDeleteFrequentlyAskedQuestionsProps = {
  id: string;
};

export function BtnDeleteFrequentlyAskedQuestions({ id }: BtnDeleteFrequentlyAskedQuestionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title={`حذف السؤال `}
      classNameChildren="bg-card"
      classNameContent="p-3 px-3 flex-nowrap flex justify-center items-center gap-1 bg-primary text-white rounded-lg text-sm flex nowrap"
      open={open}
      onOpenChange={setOpen}
      content={
        <>
          <Trash size={15} className="text-white" />
        </>
      }
    >
      <ApproveDeleteItem id={id} onSuccess={() => setOpen(false)} />
    </PopUpLayout>
  );
}
