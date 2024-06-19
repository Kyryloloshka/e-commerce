import { countDiscountedPrice } from "@/lib/utils";
import React from "react";

const Price = ({discount, price} :{discount: number, price: number}) => {
  return (
    <>
      {discount > 0 ? (
        <div>
          <p className="font-semibold tracking-wider crossed-out leading-[1.05em] text-xl">
            ${price}
          </p>
          <p className="font-semibold tracking-wider leading-[1.05em] text-3xl">
            ${countDiscountedPrice(price, discount)}
          </p>
        </div>
      ) : (
        <p className="font-bold tracking-wider text-lg leading-[1.05em]">
          ${price}
        </p>
      )}
    </>
  );
};

export default Price;
