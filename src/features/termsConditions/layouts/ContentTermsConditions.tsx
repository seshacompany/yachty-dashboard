// import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";
// import { useSearchParams } from "react-router-dom";

import { termsConditionsData } from "@/data/temp/termsConditionsData";
import { OneItemTermsConditions } from "../components/organisms/OneItemTermsConditions";
import OneItemTermsConditionsSkeleton from "../components/organisms/OneItemTermsConditionsSkeleton";
// import { useTermsConditions } from "../hooks/useTermsConditions";

const SKELETON_COUNT = 6;

export function ContentTermsConditions() {
  // const [searchParams] = useSearchParams();

  // const search = searchParams.get("search") || "";
  // const page = Number(searchParams.get("page")) || 1;

  // const { data, isLoading } = useTermsConditions({ search, page });

  const isLoading = false;

  // const frequentlyAskedQuestionsData = data?.data ?? [];
  // const totalPages = data?.totalPage ?? 0;

  return (
    <>
      {isLoading ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <OneItemTermsConditionsSkeleton key={idx} />
          ))}
        </div>
      ) : termsConditionsData.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/20 rounded-xl py-16 text-secondary-light">
          <p className="text-lg">لا توجد شروط</p>
          <p className="text-sm">لم يتم العثور على أي شروط لعرضها</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          {termsConditionsData.map((item) => (
            <OneItemTermsConditions data={item} key={item.id} />
          ))}
        </div>
      )}

      {/* {totalPages > 1 && <PaginationLayout totalPages={totalPages} />} */}
    </>
  );
}
