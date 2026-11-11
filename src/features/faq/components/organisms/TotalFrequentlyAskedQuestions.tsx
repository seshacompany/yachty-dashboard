// import { useSearchParams } from "react-router-dom";
// import { useTotalFrequentlyAskedQuestions } from "../../hooks/useTotalFrequentlyAskedQuestions";

export function TotalFrequentlyAskedQuestions() {
  // const [searchParams] = useSearchParams();
  // const search = searchParams.get("search") || "";

  // const { data: total = 0 } = useTotalFrequentlyAskedQuestions(search);

  return (
    <div className="w-full border border-solid border-sidebar/70 dark:border-white/20 p-4 rounded-xl flex justify-between gap-2">
      <p className="text-secondary-light">
        إجمالي الاسئلة
      </p>
      <p className="text-xl text-sidebar/90 dark:text-white">
        {4}
      </p>
    </div>
  );
}
