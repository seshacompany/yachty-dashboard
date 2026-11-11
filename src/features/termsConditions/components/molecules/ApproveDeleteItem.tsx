import { getApiErrorMessage } from "@/lib/axios";
import { AlertIcon } from "@/shared/icons/AlertIcon";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

import { useDeleteTermsConditions } from "../../hooks/useDeleteTermsConditions";

type ApproveDeleteItemProps = {
  id: string;
  onSuccess?: () => void;
};

export function ApproveDeleteItem({ id, onSuccess }: ApproveDeleteItemProps) {
  const { mutate: deleteTermsConditions, isPending } = useDeleteTermsConditions();

  const handleDelete = () => {
    deleteTermsConditions(id, {
      onSuccess: () => {
        toast.success("تم حذف الشرط بنجاح");
        onSuccess?.();
      },
      onError: (err) =>
        toast.error(getApiErrorMessage(err, "حدث خطأ أثناء الحذف")),
    });
  };

  return (
    <div dir="rtl" className="flex flex-col items-center gap-8 text-center">
      <div className="pt-4 flex flex-col gap-1">
        <p className="text-secondary-light text-sm">أنت علي وشك حذف الشرط</p>
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
          {isPending ? "جاري الحذف..." : "حذف الشرط"}
        </button>

        <DialogClose asChild>
          <button
            type="button"
            disabled={isPending}
            className="flex-1 cursor-pointer p-2 disabled:opacity-50 text-sidebar dark:text-white/70"
          >
            إلغاء
          </button>
        </DialogClose>
      </div>
    </div>
  );
}
