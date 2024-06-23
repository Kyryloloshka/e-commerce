import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { Button } from "../ui/button";

const existCategories = [
  {
    href: "/category/beauty",
    categoryName: "beauty",
    label: "beauty",
  },
  {
    href: "/category/fragrances",
    categoryName: "fragrances",
    label: "fragrances",
  },
  {
    href: "/category/furniture",
    categoryName: "furniture",
    label: "furniture",
  },
  {
    href: "/category/groceries",
    categoryName: "groceries",
    label: "groceries",
  },
  {
    href: "/category/home-decoration",
    categoryName: "home-decoration",
    label: "home decoration",
  },
  {
    href: "/category/kitchen-accessories",
    categoryName: "kitchen-accessories",
    label: "kitchen accessories",
  },
  {
    href: "/category/laptops",
    categoryName: "laptops",
    label: "laptops",
  },
  {
    href: "/category/mens-shirts",
    categoryName: "mens-shirts",
    label: "mens shirts",
  },
  {
    href: "/category/mens-shoes",
    categoryName: "mens-shoes",
    label: "mens shoes",
  },
  {
    href: "/category/womens-bags",
    categoryName: "womens-bags",
    label: "womens bags",
  },
  {
    href: "/category/womens-dresses",
    categoryName: "womens-dresses",
    label: "womens dresses",
  },
];

const NavCategories = () => {
  const [categories, setCategories] = useState<
    { slug: string; name: string; url: string }[]
  >([]);
  const navRef = useRef<HTMLDivElement>(null);
  const [isScrollableRight, setIsScrollableRight] = useState(true);
  const [isScrollableLeft, setIsScrollableLeft] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = existCategories.filter((category) => {
    return categories.some((cat) => cat.slug === category.categoryName);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = navRef.current;
        setIsScrollableRight(scrollLeft + clientWidth + 2 < scrollWidth);
        setIsScrollableLeft(scrollLeft > 2);
      }
    };

    handleScroll(); // Initial check
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

  if (!filteredCategories) {
    return null;
  }

  const scrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="bg-light-4">
      <div className="nav-wrapper__container">
        <div
          className={`bg-light-1 relative w-full ${
            isScrollableRight && "pseudo-elem-nav-categories-right"
          } ${isScrollableLeft && "pseudo-elem-nav-categories-left"}`}
        >
          {isScrollableLeft && (
            <Button
              onClick={scrollLeft}
              className="rounded-full h-8 hover:bg-light-6 transition-all hover:scale-110 w-8 bg-transparent shadow-none absolute left-[15px] top-1/2 -translate-y-1/2 z-10"
            >
              <i className="_icon-right-arrow rotate-180 text-dark-1 font-bold text-lg"></i>
            </Button>
          )}
          <div className="flex overflow-x-scroll scrollbar-hidden" ref={navRef}>
            {filteredCategories.map((category) => {
              return (
                <Link
                  key={category.href}
                  className="h-full whitespace-nowrap hover:text-dark-4 flex hover:bg-light-2 transition-all inner-shadow-primary items-center min-h-14 uppercase text-dark-6 tracking-wider font-semibold px-10 justify-center"
                  href={category.href}
                >
                  {category.label}
                </Link>
              );
            })}
          </div>
          {isScrollableRight && (
            <Button
              onClick={scrollRight}
              className="rounded-full h-8 hover:bg-light-6 transition-all hover:scale-110 w-8 bg-transparent shadow-none absolute right-[15px] top-1/2 -translate-y-1/2 z-10"
            >
              <i className="_icon-right-arrow text-dark-1 font-bold text-lg"></i>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavCategories;
