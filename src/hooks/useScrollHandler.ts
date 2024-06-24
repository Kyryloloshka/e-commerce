"use client"
import { useState, useEffect, RefObject } from "react";

const useScrollHandler = (
  navRef: RefObject<HTMLDivElement>,
  categories: any[]
) => {
  const [isScrollableRight, setIsScrollableRight] = useState(true);
  const [isScrollableLeft, setIsScrollableLeft] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = navRef.current;
        setIsScrollableRight(scrollLeft + clientWidth + 2 < scrollWidth);
        setIsScrollableLeft(scrollLeft > 2);
      }
    };

    handleScroll();
    window.addEventListener("resize", handleScroll);

    if (navRef.current) {
      navRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", handleScroll);
      if (navRef.current) {
        navRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [categories]);

  return [
    isScrollableRight,
    isScrollableLeft,
  ] as const;
};

export default useScrollHandler;
