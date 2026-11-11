import { SearchMessages } from "../components/organisms/SearchMessages";
import { TotalMessages } from "../components/organisms/TotalMessages";

export function HeaderMessages() {
  return (
    <div className="w-full grid md:grid-cols-11 gap-8">
      <SearchMessages />
      <div className="md:col-span-3 flex flex-row gap-8">
        <TotalMessages />
      </div>
    </div>
  );
}
