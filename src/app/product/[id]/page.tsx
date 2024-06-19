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
      <div className="flex product-details__container">
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
                    layout="fill"
                    src={image}
                    alt={product.title}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <h1 className="text-3xl font-semibold pt-12">{product.title}</h1>
          <Rating rating={product.rating} />
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>Price: ${product.price}</p>
          <p>Discount: {product.discountPercentage}%</p>
          <p>Description: {product.description}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
