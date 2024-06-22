import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark-5 text-light-3">
      <div className="footer__container flex flex-col gap-3 pt-4 pb-8 items-center">
        <div className="">
          <Link className="text-light-4 font-medium text-lg" href="/">
            E-commerce project
          </Link>
        </div>

        <p>© E-commerce project - 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
