// import { useSearchParams } from "react-router-dom";
// import { useTotalReviews } from "../../hooks/useTotalReviews";

export function TotalMessages() {
  // const [searchParams] = useSearchParams();
  // const search = searchParams.get("search") || "";

  // const { data: total = 0 } = useTotalReviews(search);

  return (
    <div className="w-full border border-solid border-sidebar/30 dark:border-white/20 p-4 rounded-xl flex justify-between gap-2">
      <p className="text-secondary-light">
        إجمالي الرسائل
      </p>
      <p className="text-xl text-sidebar/70 dark:text-white/70 ">
        {/* {total} */}
        4
      </p>
    </div>
  );
}
