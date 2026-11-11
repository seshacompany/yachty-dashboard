import { CreateTermsConditions } from "../components/organisms/CreateTermsConditions";
import { SearchTermsConditions } from "../components/organisms/SearchTermsConditions";
import { TotalTermsConditions } from "../components/organisms/TotalTermsConditions";

export function HeaderTermsConditions() {
  return (
    <div className="w-full grid md:grid-cols-11 gap-8 overflow-hidden">
      <SearchTermsConditions />
      <div className="md:col-span-5 col-span-1 flex md:flex-row flex-col gap-8">
        <TotalTermsConditions />
        <CreateTermsConditions />
      </div>
    </div>
  );
}
