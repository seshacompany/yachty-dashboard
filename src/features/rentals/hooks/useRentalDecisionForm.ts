import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { RentalDecisionStatus, RentalItem } from "../types";
import { useRentalDecision } from "./useRentalDecision";

export function useRentalDecisionForm(
  rental: RentalItem | null,
  open: boolean,
  onOpenChange: (open: boolean) => void,
) {
  const [selectedStatus, setSelectedStatus] = useState<
    RentalDecisionStatus | ""
  >("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  const { mutate: submitDecision, isPending } = useRentalDecision();

  useEffect(() => {
    if (open && rental) {
      const initialStatus: RentalDecisionStatus =
        rental.status === "approved" ||
        rental.status === "rejected" ||
        rental.status === "suspended"
          ? rental.status
          : "approved";
      setSelectedStatus(initialStatus);
      setRejectionReason(rental.rejection_reason || "");
      setReasonError(null);
    } else if (!open) {
      setSelectedStatus("");
      setRejectionReason("");
      setReasonError(null);
    }
  }, [open, rental]);

  const handleStatusChange = (status: RentalDecisionStatus) => {
    setSelectedStatus(status);
    if (status !== "rejected") {
      setReasonError(null);
    }
  };

  const handleReasonChange = (reason: string) => {
    setRejectionReason(reason);
    if (reasonError) {
      setReasonError(null);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isPending) return;
    onOpenChange(nextOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rental?.id) {
      toast.error("معرف المركب غير متوفر");
      return;
    }

    if (!selectedStatus) {
      toast.error("يرجى اختيار القرار المطلوب");
      return;
    }

    const trimmedReason = rejectionReason.trim();
    if (selectedStatus === "rejected" && !trimmedReason) {
      setReasonError("يرجى كتابة سبب الرفض قبل التأكيد");
      return;
    }

    submitDecision(
      {
        id: rental.id,
        payload:
          selectedStatus === "rejected"
            ? { status: selectedStatus, rejection_reason: trimmedReason }
            : { status: selectedStatus },
      },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return {
    selectedStatus,
    rejectionReason,
    reasonError,
    isPending,
    handleStatusChange,
    handleReasonChange,
    handleOpenChange,
    handleSubmit,
  };
}
