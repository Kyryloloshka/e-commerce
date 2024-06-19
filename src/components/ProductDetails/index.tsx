import { Product } from "@/types";
import React from "react";
import Rating from "../Rating";
import { countDiscountedPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import Stock from "./Stock";
import Price from "./Price";

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-12">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-medium pt-12 tracking-wider">
          {product.title}
        </h1>
        <Rating rating={product.rating} />
        <Stock status={product.availabilityStatus} left={product.stock} />
        <p className="text-lg tracking-wider leading-[1.1em]">
          {product.description}
        </p>
        <div className="flex  items-end flex-wrap gap-6">
          <Price discount={product.discountPercentage} price={product.price} />
          <div className="flex gap-3 flex-wrap">
            <Button
              className="flex flex-auto px-8 py-6 rounded-xl gap-3 text-light-4 text-2xl bg-primary-500 hover:bg-primary-600 hover:text-light-2 hover:shadow-xl transition duration-300"
              onClick={() => alert("Added to cart")}
            >
              <i className="_icon-cart text-[16px]"></i>
              <span className="pb-[1px] leading-[1em]">Add to Cart</span>
            </Button>
            <Button
              className="flex flex-auto bg-light-1 text-primary-500 px-8 py-6 rounded-xl gap-3  text-2xl hover:bg-light-1 hover:text-primary-600 hover:shadow-xl transition duration-300"
              onClick={() => alert("Buy now")}
            >
              <span className="pb-[1px] leading-[1em]">Buy now</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">About</h2>
        {product.brand && <p>Brand: {product.brand}</p>}
        <p>Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
