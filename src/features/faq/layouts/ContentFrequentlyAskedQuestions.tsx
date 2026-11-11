// import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
// import { useSearchParams } from "react-router-dom";

import { OneItemFrequentlyAskedQuestions } from "../components/organisms/OneItemFrequentlyAskedQuestions";
import OneItemFrequentlyAskedQuestionsSkeleton from "../components/organisms/OneItemFrequentlyAskedQuestionsSkeleton";
// import { useFrequentlyAskedQuestions } from "../hooks/useFrequentlyAskedQuestions";
import { FREQUENTLY_ASKED_QUESTIONS } from "@/data/temp/frequentlyAskedQuestionsData";

const SKELETON_COUNT = 6;

export function ContentFrequentlyAskedQuestions() {
  // const [searchParams] = useSearchParams();

  // const search = searchParams.get("search") || "";
  // const page = Number(searchParams.get("page")) || 1;

  // const { data, isLoading } = useFrequentlyAskedQuestions({ search, page });

  const isLoading = false;

  // const frequentlyAskedQuestionsData = data?.data ?? [];
  // const totalPages = data?.totalPage ?? 0;

  const frequentlyAskedQuestionsData = FREQUENTLY_ASKED_QUESTIONS;
  return (
    <>
      {isLoading ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <OneItemFrequentlyAskedQuestionsSkeleton key={idx} />
          ))}
        </div>
      ) : frequentlyAskedQuestionsData.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/20 rounded-xl py-16 text-secondary-light">
          <p className="text-lg">لا توجد أسئلة شائعة</p>
          <p className="text-sm">لم يتم العثور على أي أسئلة شائعة لعرضها</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {frequentlyAskedQuestionsData.map((item) => (
            <OneItemFrequentlyAskedQuestions data={item} key={item.id} />
          ))}
        </div>
      )}

      {/* {totalPages > 1 && <PaginationLayout totalPages={totalPages} />} */}
    </>
  );
}
