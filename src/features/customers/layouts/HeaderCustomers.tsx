import { useState } from "react";
import { FilterCustomers } from "../components/organisms/FilterCustomers";
import { ItemsFilterCustomers } from "../components/organisms/ItemsFilterCustomers";
import { SearchCustomers } from "../components/organisms/SearchCustomers";

export function HeaderCustomers() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-sidebar dark:text-white shrink-0">
          إدارة المستخدمين
        </h2>
        <div className="flex items-center gap-2 flex-1 md:max-w-md">
          <SearchCustomers />
          <FilterCustomers setShow={setShow} show={show} />
        </div>
      </div>
      <ItemsFilterCustomers show={show} />
    </div>
  );
}
