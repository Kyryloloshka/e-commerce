import Link from "next/link";
import React from "react";

const CategoryPage = () => {
  return (
    <main className="h-full flex justify-center items-center">
      <div className="category__container text-center items-center justify-center flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">
          Oops... This page is not available now
        </h1>
        <h3 className="text-2xl">But will be available soon)</h3>
        <Link
          className="header-link text-lg font-medium transition-all flex items-center gap-1 hover:gap-3 "
          href="/"
        >
          Go Home
          <i className="_icon-right-arrow text-sm pt-[0.3rem]"></i>
        </Link>
      </div>
    </main>
  );
};

export default CategoryPage;
