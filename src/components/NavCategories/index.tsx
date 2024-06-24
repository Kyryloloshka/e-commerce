import { useRef } from "react";
import "./styles.scss";
import { existCategories } from "@/lib/consts";
import useFetchCategories from "@/hooks/usesFetchCategory";
import useScrollHandler from "@/hooks/useScrollHandler";
import ScrollButton from "./_components/ScrollButton";
import CategoryList from "./_components/CategoryList";

const NavCategories = () => {
  const [categories] = useFetchCategories();
  const navRef = useRef<HTMLDivElement>(null);
  const [isScrollableRight, isScrollableLeft] = useScrollHandler(
    navRef,
    categories
  );

  const filteredCategories = existCategories.filter((category) => {
    return categories.some((cat) => cat.slug === category.categoryName);
  });

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
            <ScrollButton onClick={scrollLeft} direction="left" />
          )}
          <div className="flex overflow-x-scroll scrollbar-hidden" ref={navRef}>
            <CategoryList categories={filteredCategories} />
          </div>
          {isScrollableRight && (
            <ScrollButton onClick={scrollRight} direction="right" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavCategories;
