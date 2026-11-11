import { PopUpLayout } from "@/layouts/popUp/PopUpLayout";
import { Eye } from "lucide-react";
import { useState } from "react";
import type { messagesType } from "../../types";
import { DetailsMessage } from "../molecules/DetailsMessage";

type BtnDetailsMessagesProps = {
  data: messagesType;
};

export function BtnDetailsMessages({ data }: BtnDetailsMessagesProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopUpLayout
      title={`تفاصيل الرسالة `}
      classNameContent="p-3 px-3 flex-nowrap flex justify-center items-center gap-1 text-sidebar rounded-lg text-sm flex nowrap bg-primary/80 hover:bg-primary "
      classNameChildren="bg-background dark:bg-card-dark"
      open={open}
      onOpenChange={setOpen}
      content={
        <>
          <Eye size={15} className="text-white" />
        </>
      }
    >
      <DetailsMessage data={data} />
    </PopUpLayout>
  );
}
