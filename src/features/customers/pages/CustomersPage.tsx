import { useState } from "react";
import { ContentCustomers } from "../layouts/ContentCustomers";
import { HeaderCustomers } from "../layouts/HeaderCustomers";

export function CustomersPage() {
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderCustomers totalCount={totalCount} />
      <ContentCustomers onTotalChange={setTotalCount} />
    </div>
  );
}
