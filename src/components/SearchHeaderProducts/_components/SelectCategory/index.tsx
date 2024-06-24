import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Category } from "@/types";

interface SelectCategoryProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (pageNumber: number) => void;
}

const SelectCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}: SelectCategoryProps) => {
  return (
    <Select
      value={selectedCategory}
      onValueChange={(value) => {
        setCurrentPage(1);
        setSelectedCategory(value);
      }}
    >
      <SelectTrigger className="bg-light-1 text-dark-6 placeholder:text-gray-600 sm:max-w-[140px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value={"All categories"}>All categories</SelectItem>
          {categories.map((category: Category, index: number) => (
            <SelectItem key={index} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
