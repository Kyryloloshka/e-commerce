"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Rating from "@/components/Rating";
import { countDiscountedPrice } from "@/lib/utils";
import "./styles.scss";

const NextArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500/20 hover:bg-gray-500/40"
      variant={"circle"}
      size={"circle"}
      onClick={onClick}
    >
      <i className="_icon-right-arrow text-sm text-dark-6"></i>
    </Button>
  );
};

const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-[1] bg-gray-500/20 hover:bg-gray-500/40"
      variant={"circle"}
      size={"circle"}
      onClick={onClick}
    >
      <i className="_icon-right-arrow text-sm rotate-180 text-dark-6"></i>
    </Button>
  );
};

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

  if (!product) return <main>Loading...</main>;

  const settings = {
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
  const images = [...product.images];
  if (!images.length) images.push(product.thumbnail);

  return (
    <main>
      <div className="flex product-details__container gap-4">
        <div className="w-1/2 relative">
          {images.length === 1 ? (
            <Image
              src={images[0]}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <Slider {...settings}>
              {product.images.map((image: string, index: number) => (
                <div key={index} className="relative w-full h-0 pb-[100%]">
                  <Image
                    className="object-contain"
                    height={product.dimensions.height}
                    width={product.dimensions.width}
                    layout="responsive"
                    src={image}
                    alt={product.title}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-medium pt-12 tracking-wider">
              {product.title}
            </h1>
            <Rating rating={product.rating} />
            {product.availabilityStatus === "In Stock" ? (
              <div className="flex items-center gap-3">
                <p className="bg-light-6 self-start p-1 rounded-full flex items-center">
                  <i className="_icon-check bg-primary-500 text-sm text-white w-5 h-5 flex items-center justify-center rounded-full"></i>
                  <span className="px-1.5 text-primary-600 pb-[1px]">
                    {product.availabilityStatus}
                  </span>
                </p>
                <span className="pb-[1px]">
                  The goods left - {product.stock}
                </span>
              </div>
            ) : (
              <p className="bg-gray-300 self-start p-1 rounded-full flex items-center">
                <span className="px-1.5 text-slate-600">
                  {product.availabilityStatus}
                </span>
              </p>
            )}
            <p className="text-lg tracking-wider leading-[1.1em]">
              {product.description}
            </p>
            <div className="flex  items-end flex-wrap gap-3">
              {product.discountPercentage > 0 ? (
                <div>
                  <p className="font-semibold tracking-wider crossed-out leading-[1.05em] text-xl">
                    ${product.price}
                  </p>
                  <p className="font-semibold tracking-wider leading-[1.05em] text-3xl">
                    $
                    {countDiscountedPrice(
                      product.price,
                      product.discountPercentage
                    )}
                  </p>
                </div>
              ) : (
                <p className="font-bold tracking-wider text-lg leading-[1.05em]">
                  ${product.price}
                </p>
              )}
              <div className="flex gap-3 flex-wrap">
                <Button
                  className="flex px-8 py-6 rounded-xl gap-3 text-light-4 text-2xl bg-primary-500 hover:bg-primary-600 hover:text-light-2 hover:shadow-xl transition duration-300"
                  onClick={() => alert("Added to cart")}
                >
                  <i className="_icon-cart text-[16px]"></i>
                  <span className="pb-[1px] leading-[1em]">Add to Cart</span>
                </Button>
                <Button
                  className="flex bg-light-1 text-primary-500 px-8 py-6 rounded-xl gap-3  text-2xl hover:bg-light-1 hover:text-primary-600 hover:shadow-xl transition duration-300"
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
      </div>
    </main>
  );
};

export default ProductDetailsPage;
