import React from "react";
import { Button } from "../ui/button";

const Pagination = ({
  setCurrentPage,
  currentPage,
  totalPages,
}: {
  currentPage: number;
  setCurrentPage: (page: (prev: number) => number) => void;
  totalPages: number;
}) => {
  return (
    totalPages > 1 && (
      <div className="flex gap-3 items-center self-center justify-center">
        <Button
          variant={"circle"}
          size={"circle"}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setCurrentPage((prev): number => Math.max(prev - 1, 1));
          }}
          disabled={currentPage === 1}
        >
          <i className="_icon-right-arrow text-sm rotate-180"></i>
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant={"circle"}
          size={"circle"}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
        >
          <i className="_icon-right-arrow text-sm"></i>
        </Button>
      </div>
    )
  );
};

export default Pagination;
