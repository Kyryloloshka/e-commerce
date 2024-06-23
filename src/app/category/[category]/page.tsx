"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import FilterSidebar from "@/components/FilterSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ITEMS_PER_PAGE } from "@/lib/consts";
import Pagination from "@/components/Pagination";
import NotFoundPage from "@/app/not-found";

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [productsToShow, setProductsToShow] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { category } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );

        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    const paginateProducts = () => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setProductsToShow(filteredProducts.slice(startIndex, endIndex));
    };

    paginateProducts();
  }, [filteredProducts, currentPage]);
  if (loading) {
    return (
      <main className="loading__conainter text-2xl font-bold flex items-center justify-center	text-center">
        Loading...
      </main>
    );
  }
  if (!products.length) {
    return (
      <NotFoundPage message={"Sorry... but this category was not found :("} />
    );
  }

  if (category instanceof Array) {
    return null;
  }
  return (
    <main className="pt-12 pb-24">
      <div className="breadcrumbs__container pb-6">
        <Breadcrumbs
          items={[{ label: category, href: `/category/${category}` }]}
        />
      </div>
      <div className="main__container flex gap-4 flex-wrap">
        <FilterSidebar
          setTotalPages={setTotalPages}
          products={products}
          setProducts={setFilteredProducts}
          setCurrentPage={setCurrentPage}
        />
        <div className="flex-auto">
          {productsToShow.length === 0 ? (
            <div className="flex items-center justify-center text-xl w-full font-bold">
              No results :(
            </div>
          ) : (
            <>
              <div className="product-list flex-auto">
                {productsToShow.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
