"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?limit=10&skip=${
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
  }, [currentPage]);

  return (
    <main className="pt-12 pb-24">
      <div className="main__container flex flex-col">
        <h1 className="text-3xl font-bold text-dark-6">All Products</h1>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex gap-3 items-center self-center">
          <Button
            variant={"circle"}
            size={"circle"}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev - 1, totalPages))
            }
            disabled={currentPage === totalPages}
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
