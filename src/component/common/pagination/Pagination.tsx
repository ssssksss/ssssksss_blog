"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  pageHandler: (currentPage: number) => void;
}

const Pagination = ({currentPage, totalPages, pageHandler}: Props) => {
  const pageList = Array.from({length: totalPages}, (_, index) => index + 1);
  const leftPage = Math.max(currentPage - 2, 1);
  const rightPage = Math.min(leftPage + 4, totalPages);

  return (
    <div className="text-black flex flex-row items-center justify-center gap-3 py-12 text-sm">
      <button
        className={`rounded-md px-3 py-2 ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={() => pageHandler(1)}
        disabled={currentPage === 1}>
        <ChevronsLeft size={16} />
      </button>

      <button
        className={`rounded-md px-3 py-2 ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={() => pageHandler(currentPage - 1)}
        disabled={currentPage === 1}>
        <ChevronLeft size={16} />
      </button>

      {pageList.slice(leftPage - 1, rightPage).map((page) => (
        <button
          key={page}
          className={`min-w-[2.5rem] rounded-md px-3 py-2 ${
            page === currentPage
              ? "bg-primary-80 text-white-60"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => pageHandler(page)}>
          {page}
        </button>
      ))}

      <button
        className={`rounded-md px-3 py-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={() => pageHandler(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <ChevronRight size={16} />
      </button>

      <button
        className={`rounded-md px-3 py-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "bg-white hover:bg-gray-100"
        }`}
        onClick={() => pageHandler(totalPages)}
        disabled={currentPage === totalPages}>
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;