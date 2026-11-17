import { formatDateToDDMMYYYY } from "@/lib/formatDate";

export function formatOptionalDate(date?: string | null): string {
  return date ? formatDateToDDMMYYYY(date) : "—";
}
