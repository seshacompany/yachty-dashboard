import { useState } from "react";
import { FilterCustomers } from "../components/organisms/FilterCustomers";
import { ItemsFilterCustomers } from "../components/organisms/ItemsFilterCustomers";
import { SearchCustomers } from "../components/organisms/SearchCustomers";

type HeaderCustomersProps = {
  totalCount?: number;
};

export function HeaderCustomers({ totalCount }: HeaderCustomersProps) {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-navy dark:text-coastal-white shrink-0">
          إدارة المستخدمين
          {totalCount !== undefined ? ` (${totalCount})` : ""}
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 md:max-w-2xl">
          <SearchCustomers />
          <FilterCustomers setShow={setShow} show={show} />
        </div>
      </div>
      <ItemsFilterCustomers show={show} />
    </div>
  );
}
