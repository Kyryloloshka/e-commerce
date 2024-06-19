import Link from "next/link";
import React from "react";
import "./styles.scss";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blur">
      <div className="min-h-16 header__container h-full items-center flex justify-between">
        <div className="text-xl font-bold">
          <Link className="text-dark-6" href="/">
            E-commerce project
          </Link>
        </div>
        <nav>
          <ul className="flex adaptive-gap">
            <li>
              <Link href="/">Products</Link>
            </li>
            <li>
              <Link href="/my-cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
