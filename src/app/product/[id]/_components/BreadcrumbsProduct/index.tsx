import Breadcrumbs from "@/components/Breadcrumbs";
import { Product } from "@/types";
import React from "react";

const BreadcrumbsProduct = ({ product }: { product: Product }) => {
  return (
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
  );
};

export default BreadcrumbsProduct;
