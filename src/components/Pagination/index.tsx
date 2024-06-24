import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: (prev: number) => number) => void;
  totalPages: number;
}

const Pagination = ({
  setCurrentPage,
  currentPage,
  totalPages,
}: PaginationProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    totalPages > 1 && (
      <div className={` flex gap-3 items-center self-center justify-center`}>
        <Button
          variant={"primary"}
          size={"circle"}
          className={`${currentPage === 1 && "pointer-events-none opacity-50"}`}
          onClick={() => {
            scrollToTop();
            setCurrentPage((prev): number => Math.max(prev - 1, 1));
          }}
        >
          <i className="_icon-right-arrow text-sm rotate-180"></i>
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant={"primary"}
          className={`${
            currentPage === totalPages && "pointer-events-none opacity-50"
          }`}
          size={"circle"}
          onClick={() => {
            scrollToTop();
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
          }}
        >
          <i className="_icon-right-arrow text-sm"></i>
        </Button>
      </div>
    )
  );
};

export default Pagination;
