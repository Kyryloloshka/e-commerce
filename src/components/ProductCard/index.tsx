import { Product } from "@/types";
import Image from "next/image";
import React from "react";
import "./styles.scss";
import { countDiscountedPrice } from "@/lib/utils";
import Rating from "./Rating";
import Link from "next/link";
import { Button } from "../ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="hover:scale-[1.02] rounded-xl hover:bg-light-1 transition p-5 flex flex-col relative duration-300 ease-in-out group">
      <Link href={`/product/${product.id}`}>
        <Image
          className="group-hover:scale-105 pb-2 transition-transform duration-300 ease-in-out cursor-pointer"
          width={300}
          height={300}
          src={product.thumbnail}
          alt={product.title}
        />
      </Link>
      <Link href={`/product/${product.id}`}>
        <h3 className="text-xl tracking-wider">{product.title}</h3>
      </Link>
      <Rating rating={product.rating} />
      <p className="absolute text-right top-0 right-0 max-w-full m-2 bg-light-2 bg-opacity-65 rounded-md px-3 py-1 text-sm font-semibold text-dark-6 ">
        {product.category}
      </p>
      <p className="pb-3 flex-auto">
        {product.brand && <>Brand: {product.brand}</>}
      </p>
      <div className="flex justify-between items-end">
        {product.discountPercentage > 0 ? (
          <div>
            <p className="font-bold tracking-wider crossed-out leading-[1.05em]">
              ${product.price}
            </p>
            <p className="font-bold tracking-wider text-lg leading-[1.05em]">
              ${countDiscountedPrice(product.price, product.discountPercentage)}
            </p>
          </div>
        ) : (
          <p className="font-bold tracking-wider text-lg leading-[1.05em]">
            ${product.price}
          </p>
        )}
        <Button className="_icon-cart text-light-4 text-2xl bg-primary-500 hover:bg-primary-600 hover:text-light-2 hover:shadow-xl transition duration-500"></Button>
      </div>
    </div>
  );
};

export default ProductCard;
