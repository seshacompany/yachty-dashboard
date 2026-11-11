import { getApiErrorMessage } from "@/lib/axios";
import { AlertIcon } from "@/shared/icons/AlertIcon";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

import { useDeleteReview } from "../../hooks/useDeleteReview";

type ApproveDeleteItemProps = {
  id: string;
  onSuccess?: () => void;
};

export function ApproveDeleteItem({ id, onSuccess }: ApproveDeleteItemProps) {
  const { mutate: deleteReview, isPending } = useDeleteReview();

  const handleDelete = () => {
    deleteReview(id, {
      onSuccess: () => {
        toast.success("تم حذف الرسالة بنجاح");
        onSuccess?.();
      },
      onError: (err: unknown) =>
        toast.error(getApiErrorMessage(err, "حدث خطأ أثناء الحذف")),
    });
  };

  return (
    <div dir="rtl" className="flex flex-col items-center gap-8 text-center">
      <div className="pt-4 flex flex-col gap-1">
        <p className="text-secondary-light text-sm">أنت علي وشك حذف الرسالة</p>
        <p className="text-4xl text-sidebar dark:text-white">هل تريد التاكيد</p>
      </div>
      <div>
        <AlertIcon />
      </div>

      <div className="w-full flex md:flex-row flex-col gap-4 px-4 pb-4">
        <button
          onClick={handleDelete}
          type="button"
          disabled={isPending}
          className="flex-1 bg-chart-6 hover:bg-chart-6/90 text-white rounded-md p-2 cursor-pointer disabled:opacity-50 transition-colors"
        >
          {isPending ? "جاري الحذف..." : "حذف رسالة"}
        </button>

        <DialogClose asChild>
          <button
            type="button"
            disabled={isPending}
            className="flex-1 cursor-pointer p-2 disabled:opacity-50 text-sidebar dark:text-white"
          >
            إلغاء
          </button>
        </DialogClose>
      </div>
    </div>
  );
}
