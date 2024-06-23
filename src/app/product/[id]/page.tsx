"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/legacy/image";
import "./styles.scss";
import ProductDetails from "@/components/ProductDetails";
import NextArrow from "./_components/NextArrow";
import PrevArrow from "./_components/PrevArrow";
import Breadcrumbs from "@/components/Breadcrumbs";
import Loading from "@/components/Loading";
import SimmilarProducts from "@/components/SimmilarProducts";

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

  if (!product) {
    return <Loading />;
  }

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
    <main className="pt-12 pb-24">
      <div className="breadcrumbs__container">
        <Breadcrumbs
          items={[
            {
              label: product.category,
              href: `/category/${product.category}`,
            },
            { label: product.title, href: `/product/${product.id}` },
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row product-details__container gap-4">
        <div className="w-full md:w-1/2 relative">
          {images.length === 1 ? (
            <div className="relative w-full h-[500px]">
              <Image
                src={images[0]}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                priority={true}
              />
            </div>
          ) : (
            <Slider {...settings}>
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
          )}
        </div>
        <ProductDetails product={product} />
      </div>
      <div className="simmilar-products__container">
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-dark-6">You may also like</h3>
          <SimmilarProducts
            category={product.category}
            nonRepeatId={product.id}
          />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
