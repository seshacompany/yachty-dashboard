import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Trash } from "lucide-react";
import { useState } from "react";
import { ApproveDeleteItem } from "../molecules/ApproveDeleteItem";

type BtnDeleteMessagesProps = {
  id: string;
};

export function BtnDeleteMessages({ id }: BtnDeleteMessagesProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title={`حذف الرسالة `}
      classNameChildren="bg-background dark:bg-card-dark"
      classNameContent="p-3 px-3 flex-nowrap flex justify-center items-center gap-1 bg-primary/80 hover:bg-primary text-white rounded-lg text-sm flex nowrap"
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
