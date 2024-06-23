import { COUNT_SIMMILAR_PRODUCTS } from "@/lib/consts";
import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const SimmilarProducts = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${category}?limit=${COUNT_SIMMILAR_PRODUCTS}`
        );

        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, products]);
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SimmilarProducts;
