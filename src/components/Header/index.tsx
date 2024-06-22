import Link from "next/link";
import React from "react";
import "./styles.scss";
import NavLinks from "./_components/NavLinks";


const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blur shadow-3xl">
      <div className="min-h-16 header__container h-full items-center flex justify-between">
        <div className="text-xl font-bold">
          <Link className="text-dark-6" href="/">
            E-commerce project
          </Link>
        </div>
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
