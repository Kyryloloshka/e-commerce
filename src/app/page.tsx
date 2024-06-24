"use client";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import NavCategories from "@/components/NavCategories";
import SearchHeaderProducts from "@/components/SearchHeaderProducts";
import useFetchCategories from "@/hooks/usesFetchCategory";
import useFetchProducts from "@/hooks/useFetchProducts";

const ProductsPage: React.FC = () => {
  const [categories] = useFetchCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All categories");
  const [currentPage, setCurrentPage] = useState(1);

  const { products, totalPages } = useFetchProducts(
    selectedCategory,
    searchQuery,
    currentPage
  );

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
