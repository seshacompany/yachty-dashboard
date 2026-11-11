import { useState } from "react";
import { ContentEmployees } from "../layouts/ContentEmployees";
import { HeaderEmployees } from "../layouts/HeaderEmployees";

export function EmployeesPage() {
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);

  return (
    <div className="w-full flex flex-col md:gap-6 gap-6">
      <HeaderEmployees totalItems={totalItems} />
      <ContentEmployees onTotalItemsChange={setTotalItems} />
    </div>
  );
}
