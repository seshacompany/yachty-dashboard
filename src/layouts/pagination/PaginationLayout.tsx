import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

type PaginationLayoutProps = {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

export function PaginationLayout({
  totalPages,
  currentPage: currentPageProp,
  onPageChange,
}: PaginationLayoutProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isControlled = currentPageProp !== undefined && onPageChange !== undefined;

  const currentPage = isControlled
    ? currentPageProp
    : Number(searchParams.get("page")) || 1;

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    if (isControlled) {
      onPageChange(page);
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    navigate(`?${params.toString()}`);
  };

  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="w-full flex justify-center items-center py-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage <= 1}
            onClick={() => changePage(currentPage - 1)}
          />
        </PaginationItem>

        {visiblePages.map((page, idx) => (
          <PaginationItem key={typeof page === "number" ? page : `ellipsis-${idx}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => changePage(page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => changePage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
