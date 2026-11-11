// import { PaginationLayout } from "@/layouts/pagination/PaginationLayout";

import { MessagesData } from "@/data/temp/messagesData";
import { OneItemMessages } from "../components/organisms/OneItemMessages";
import { OneItemMessagesSkeleton } from "../components/organisms/OneItemMessagesSkeleton";

const SKELETON_COUNT = 6;

export function ContentMessages() {
  // const [searchParams] = useSearchParams();

  // const search = searchParams.get("search") || "";
  // const page = Number(searchParams.get("page")) || 1;

  // const { isLoading } = useReviews({ search, page });
  const data = MessagesData;

  const isLoading = false;

  // const reviews = data?.data ?? [];
  // const totalPages = data?.totalPage ?? 0;

  const messages = data ?? [];
  // const totalPages = data ?? 0;

  return (
    <>
      {isLoading ? (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
            <OneItemMessagesSkeleton key={idx} />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 border border-dashed dark:border-white/20 border-sidebar/30 rounded-xl py-16 text-secondary-light">
          <p className="text-lg">لا توجد رسائل</p>
          <p className="text-sm">لم يتم العثور على أي رسائل لعرضها</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {messages.map((item) => (
            <OneItemMessages data={item} key={item.id} />
          ))}
        </div>
      )}

      {/* {totalPages > 1 && <PaginationLayout totalPages={totalPages} />} */}
    </>
  );
}
