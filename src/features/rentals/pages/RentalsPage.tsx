import { useState } from "react";
import { RentalsFilterBar } from "../components/organisms/RentalsFilterBar";
import { RentalsTable } from "../components/organisms/RentalsTable";

export function RentalsPage() {
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

  return (
    <div className="w-full flex flex-col gap-6">
      <RentalsFilterBar totalCount={totalCount} />
      <RentalsTable onTotalChange={setTotalCount} />
    </div>
  );
}
