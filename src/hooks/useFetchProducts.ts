"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/types";
import { ITEMS_PER_PAGE } from "@/lib/consts";

const useFetchProducts = (
  selectedCategory: string,
  searchQuery: string,
  currentPage: number
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);

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

  return { products, totalPages } as const;
};

export default useFetchProducts;
