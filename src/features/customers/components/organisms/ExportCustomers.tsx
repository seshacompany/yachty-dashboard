import { getApiErrorMessage } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { FileInputIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { exportCustomersPdf } from "../../lib/exportCustomersPdf";

export function ExportCustomers() {
  const { mutate: exportPdf, isPending } = useMutation({
    mutationFn: exportCustomersPdf,
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `customers-report-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("تم تصدير التقرير بنجاح");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "تعذر تصدير التقرير"));
    },
  });

  return (
    <button
      type="button"
      onClick={() => exportPdf()}
      disabled={isPending}
      className="md:flex-0 flex-1 p-2 px-4 flex justify-center items-center gap-1 bg-primary text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <FileInputIcon size={20} />
      )}
      <p>تصدير</p>
    </button>
  );
}
