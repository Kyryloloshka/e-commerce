"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response =
          selectedCategory !== "All categories"
            ? await axios.get(
                `https://dummyjson.com/products/category/${selectedCategory}`
              )
            : await axios.get(
                `https://dummyjson.com/products/search?q=${searchQuery}&limit=10&skip=${
                  (currentPage - 1) * 10
                }`
              );

        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / 10));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory]);

  return (
    <main className="pt-12 pb-24">
      <div className="main__container flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-dark-6">All Products</h1>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-light-1 text-dark-6 placeholder:text-gray-600 sm:max-w-[250px]"
          />
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
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
        </div>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex gap-3 items-center self-center">
          <Button
            variant={"circle"}
            size={"circle"}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <i className="_icon-right-arrow text-sm rotate-180"></i>
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant={"circle"}
            size={"circle"}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <i className="_icon-right-arrow text-sm"></i>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
