// import { useSearchParams } from "react-router-dom";
// import { useTotalTermsConditions } from "../../hooks/useTotalTermsConditions";

export function TotalTermsConditions() {
  // const [searchParams] = useSearchParams();
  // const search = searchParams.get("search") || "";

  // const { data: total = 0 } = useTotalTermsConditions(search);

  return (
    <div className="w-full border border-solid border-sidebar/40 dark:border-white/20 p-4 rounded-xl flex justify-between gap-2">
      <p className="text-secondary-light">
        إجمالي الشروط
      </p>
      <p className="text-xl text-sidebar dark:text-white">
        {4}
      </p>
    </div>
  );
}
