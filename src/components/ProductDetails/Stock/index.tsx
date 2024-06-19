import { Product } from "@/types";
import React from "react";

const Stock = ({ status, left }: { status: string; left: number }) => {
  return (
    <>
      <div className="flex items-center gap-3">
        {status === "In Stock" ? (
          <p className="bg-light-6 self-start p-1 rounded-full flex items-center">
            <i className="_icon-check bg-primary-500 text-sm text-white w-5 h-5 flex items-center justify-center rounded-full"></i>
            <span className="px-1.5 text-primary-600 pb-[1px]">{status}</span>
          </p>
        ) : status === "Low Stock" ? (
          <p className="bg-red-700  self-start p-1 rounded-full flex items-center">
            <span className="px-1.5 text-light-1">{status}</span>
          </p>
        ) : (
          <p className="bg-gray-300 self-start p-1 rounded-full flex items-center">
            <span className="px-1.5 text-slate-600">{status}</span>
          </p>
        )}
        {left !== 0 && (
          <span className="pb-[1px]">The goods left - {left}</span>
        )}
      </div>
    </>
  );
};

export default Stock;
