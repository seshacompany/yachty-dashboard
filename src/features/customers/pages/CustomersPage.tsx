import { CartsCustomers } from "../components/organisms/CartsCustomers";
import { ContentCustomers } from "../layouts/ContentCustomers";
import { HeaderCustomers } from "../layouts/HeaderCustomers";

export function CustomersPage() {
  return (
    <div className="w-full flex flex-col gap-8">
      <HeaderCustomers />
      <CartsCustomers />
      <ContentCustomers />
    </div>
  );
}
