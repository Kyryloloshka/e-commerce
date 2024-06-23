import React, { useEffect, useState } from "react";
import "./styles.scss";
import * as Slider from "@radix-ui/react-slider";
import { Checkbox } from "@/components/ui/checkbox";
import { countDiscountedPrice, roundToTwoDecimals } from "@/lib/utils";
import { Product } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Filters from "./_components/Filters";

const FilterSidebar = ({
  products,
  setProducts,
  setCurrentPage,
  setTotalPages,
}: {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
}) => {
  return (
    <>
      <div className="flex-col gap-8 hidden md:flex">
        <h2 className="text-xl font-medium">Filters</h2>
        <Filters
          products={products}
          setProducts={setProducts}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      </div>
      <Accordion type="single" collapsible className="w-full md:hidden block">
        <AccordionItem value="filter">
          <AccordionTrigger>
            <h2 className="text-xl font-medium">Filters</h2>
          </AccordionTrigger>
          <AccordionContent>
            <Filters
              products={products}
              setProducts={setProducts}
              setCurrentPage={setCurrentPage}
              setTotalPages={setTotalPages}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default FilterSidebar;
