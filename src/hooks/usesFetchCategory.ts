"use client"
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<
    { slug: string; name: string; url: string }[]
  >([]);

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

  return [categories, setCategories] as const;
};

export default useFetchCategories;
