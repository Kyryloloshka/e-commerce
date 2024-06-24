import React from "react";
import Link from "next/link";

interface CategoryListProps {
  categories: { href: string; categoryName: string; label: string }[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.href}
          className="h-full whitespace-nowrap hover:text-dark-4 flex hover:bg-light-2 transition-all inner-shadow-primary items-center min-h-14 uppercase text-dark-6 tracking-wider font-semibold px-10 justify-center"
          href={category.href}
        >
          {category.label}
        </Link>
      ))}
    </>
  );
};

export default CategoryList;
