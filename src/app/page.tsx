"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@/types";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/lib/consts";
import NavCategories from "@/components/NavCategories";
import SearchHeaderProducts from "@/components/SearchHeaderProducts";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");

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
                `https://dummyjson.com/products/category/${selectedCategory}?limit=${ITEMS_PER_PAGE}&skip=${
                  (currentPage - 1) * ITEMS_PER_PAGE
                }`
              )
            : await axios.get(
                `https://dummyjson.com/products/search?q=${searchQuery}&limit=${ITEMS_PER_PAGE}&skip=${
                  (currentPage - 1) * ITEMS_PER_PAGE
                }`
              );
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory]);

  return (
    <>
      <NavCategories />
      <main className="pt-12 pb-24">
        <div className="main__container flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-dark-6">All Products</h1>
          <SearchHeaderProducts
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
          <div className="product-list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
