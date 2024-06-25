import React from "react";
import { Input } from "../ui/input";
import SelectCategory from "./_components/SelectCategory";
import { Category } from "@/types";

interface SearchHeaderProductsProps {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

const SearchHeaderProducts = ({
  setSearchQuery,
  searchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}: SearchHeaderProductsProps) => {
  return (
    <div className="flex gap-4 flex-wrap bg-[#80dfff20] p-2 rounded-lg justify-end">
      <Input
        type="text"
        placeholder="Search products..."
        disabled={selectedCategory !== "All categories"}
        value={searchQuery}
				role="textbox"
        aria-label="Search product"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-light-1 text-dark-6 placeholder:text-gray-600 sm:max-w-[250px]"
      />
      <SelectCategory
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SearchHeaderProducts;
