import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = ({ message }: { message?: string }) => {
  return (
    <main className="relative flex items-center justify-center flex-col gap-3 ">
      <div className="not-found__container flex items-center justify-center text-center flex-col gap-3">
        <h1 className="text-5xl font-bold flex-auto text-primary-600">404</h1>
        <h3 className="text-xl">
          {message ? message : "Sorry... We could not find that page"}
        </h3>
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

export default NotFoundPage;
