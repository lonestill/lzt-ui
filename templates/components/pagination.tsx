"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showTitle?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showTitle = true,
  className,
  ...props
}: PaginationProps) {
  const pages = React.useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "...", ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "...", ...middleRange, "...", totalPages];
  }, [totalPages, siblingCount, currentPage]);

  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        "PageNav flex items-center justify-end gap-1.5 select-none",
        className
      )}
      {...props}
    >
      {showTitle && (
        <span className="pageNavHeader text-[13px] text-[rgb(140,162,154)] pr-2 leading-[30px]">
          Страница {currentPage} из {totalPages}
        </span>
      )}

      {/* Prev button */}
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          "PageNavPrev flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border border-transparent text-[13px] font-semibold text-[rgb(214,214,214)] transition-colors duration-150 cursor-pointer hover:bg-[rgb(30,39,37)] hover:text-white",
          currentPage <= 1 && "pointer-events-none opacity-30 cursor-not-allowed hover:bg-transparent"
        )}
        title="Предыдущая"
        aria-label="Предыдущая страница"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="flex h-[30px] w-[30px] items-center justify-center text-[13px] text-[rgb(140,162,154)]"
            >
              ...
            </span>
          );
        }

        const pageNumber = Number(page);
        const isCurrent = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "flex h-[30px] min-w-[30px] px-2 items-center justify-center rounded-[10px] border border-transparent text-[13px] font-semibold transition-colors duration-150 cursor-pointer",
              isCurrent
                ? "currentPage bg-[rgb(34,142,93)] text-[rgb(245,245,245)] font-bold shadow-sm"
                : "text-[rgb(214,214,214)] hover:bg-[rgb(30,39,37)] hover:text-white"
            )}
            aria-current={isCurrent ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next button */}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          "PageNavNext flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border border-transparent text-[13px] font-semibold text-[rgb(214,214,214)] transition-colors duration-150 cursor-pointer hover:bg-[rgb(30,39,37)] hover:text-white",
          currentPage >= totalPages &&
            "pointer-events-none opacity-30 cursor-not-allowed hover:bg-transparent"
        )}
        title="Следующая"
        aria-label="Следующая страница"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
