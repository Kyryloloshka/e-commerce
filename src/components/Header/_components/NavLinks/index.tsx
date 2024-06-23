"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "./styles.scss";

const links = [
  { href: "/", label: "Home" },
  { href: "/category", label: "categories" },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <nav className="">
      <ul className="py-4 flex adaptive-gap flex-wrap items-center justify-center text-center">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                className={`font-medium uppercase transition header-link ${
                  isActive && "active-link"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinks;
