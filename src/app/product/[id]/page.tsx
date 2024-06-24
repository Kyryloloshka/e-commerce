"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types";
import { useParams } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/legacy/image";
import "./styles.scss";
import ProductDetails from "@/components/ProductDetails";
import Loading from "@/components/Loading";
import SliderProduct from "./_components/Slider";
import Simmilar from "./_components/Simmilar";
import BreadcrumbsProduct from "./_components/BreadcrumbsProduct";

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

  const images = [...product.images];
  if (!images.length) images.push(product.thumbnail);

  return (
    <main className="pt-12 pb-24">
      <BreadcrumbsProduct product={product} />
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
            <SliderProduct product={product} />
          )}
        </div>
        <ProductDetails product={product} />
      </div>
      <Simmilar product={product} />
    </main>
  );
};

export default ProductDetailsPage;
