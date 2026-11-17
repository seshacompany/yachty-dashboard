import { Mail, Phone } from "lucide-react";
import { DebouncedSearchInput } from "../atoms/DebouncedSearchInput";

export function SearchCustomers() {
  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
      <DebouncedSearchInput
        paramKey="email"
        placeholder="البحث بالبريد الإلكتروني..."
        icon={Mail}
      />
      <DebouncedSearchInput
        paramKey="phone"
        placeholder="البحث برقم الهاتف..."
        icon={Phone}
      />
    </div>
  );
}
