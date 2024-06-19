import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark-5 text-light-3">
      <div className="footer__container flex flex-col gap-3 pt-8 pb-4">
        <div className="">
          <Link className="text-light-3" href="/">
            E-commerce project
          </Link>
        </div>
        <nav>
          <ul className="flex adaptive-gap">
            <li>
              <Link className="text-light-3" href="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="text-light-3" href="/selected-products">
                Selected Products
              </Link>
            </li>
          </ul>
        </nav>
        <p>© E-commerce project - 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
