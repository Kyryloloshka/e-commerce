import Link from "next/link";
import React from "react";
import "./styles.scss";
import NavLinks from "./_components/NavLinks";

const Header = () => {
  return (
    <div className="relative z-[1000]">
      <header className="fixed top-0 left-0 w-full bg-blur shadow-3xl">
        <div className="min-h-16 gap-4 header__container h-full items-center flex justify-between">
          <div className="text-xl font-bold">
            <Link className="text-dark-6 whitespace-nowrap adaptive-size-logo" href="/">
              E-commerce project
            </Link>
          </div>
          <NavLinks />
        </div>
      </header>
    </div>
  );
};

export default Header;
