"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types";
import { useParams, useRouter } from "next/navigation";

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `https://dummyjson.com/products/${id}`
          );
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Category: {product.category}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: ${product.price}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Rating: {product.rating}</p>
      <p>Description: {product.description}</p>
      <p>Stock: {product.stock}</p>
      <div className="product-images">
        {product.images.map((image: string, index: number) => (
          <img
            key={index}
            src={image}
            alt={`${product.title} image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
