// src/components/ProductCard.tsx
import { Product } from "@/types";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import "./styles.scss";
import { countDiscountedPrice } from "@/lib/utils";
import { useRating } from "@/hooks/useRating";
import Rating from "./Rating";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card">
      <Image
        width={300}
        height={300}
        src={product.thumbnail}
        alt={product.title}
      />
      <h3 className="text-xl tracking-wider">{product.title}</h3>
      <Rating rating={product.rating} />
      <p className="pb-1">Category: {product.category}</p>
      <p className="pb-3">Brand: {product.brand}</p>
      {product.discountPercentage > 0 ? (
        <>
          <p className="font-bold tracking-wider crossed-out leading-[1.05em]">
            ${product.price}
          </p>
          <p className="font-bold tracking-wider text-lg leading-[1.05em]">
            ${countDiscountedPrice(product.price, product.discountPercentage)}
          </p>
        </>
      ) : (
        <p className="font-bold tracking-wider text-lg leading-[1.05em]">
          ${product.price}
        </p>
      )}
    </div>
  );
};

export default ProductCard;
