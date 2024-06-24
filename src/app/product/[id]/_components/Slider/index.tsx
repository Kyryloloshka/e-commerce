import React from "react";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";
import Image from "next/legacy/image";
import { Product } from "@/types";
import Slider from "react-slick";

const settingsForSlider = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const SliderProduct = ({ product }: { product: Product }) => {
  return (
    <Slider {...settingsForSlider}>
      {product.images.map((image: string, index: number) => (
        <div key={index} className="relative w-full h-0 pb-[100%] ">
          <Image
            className="object-contain"
            layout="fill"
            src={image}
            alt={product.title}
            priority={true}
          />
        </div>
      ))}
    </Slider>
  );
};

export default SliderProduct;
