import React, { useEffect, useState } from "react";
import "./styles.scss";
import * as Slider from "@radix-ui/react-slider";
import { Checkbox } from "@/components/ui/checkbox";
import { countDiscountedPrice, roundToTwoDecimals } from "@/lib/utils";
import { Product } from "@/types";
import { Button } from "../ui/button";

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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const maxPrice = products.reduce((max, product) => {
      const price = countDiscountedPrice(
        product.price,
        product.discountPercentage
      );
      return price > max ? price : max;
    }, 0);
    console.log(maxPrice);
    setMaxPrice(maxPrice);
    setPriceRange({ min: 0, max: maxPrice });
  }, [products]);

  const applyFilters = () => {
    let filteredProducts = products;

    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    filteredProducts = filteredProducts.filter((product) => {
      const price = countDiscountedPrice(
        product.price,
        product.discountPercentage
      );
      return price >= priceRange.min && price <= priceRange.max;
    });

    setProducts(filteredProducts);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredProducts.length / 10));
  };

  const brands = Array.from(new Set(products.map((product) => product.brand)));
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">Filters</h2>
      <div className="flex flex-col gap-3">
        {brands.length > 1 && brands[0] !== undefined && (
          <>
            <h3 className="text-lg">Brands</h3>
            {brands.map((brand) => (
              <>
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBrands([...selectedBrands, brand]);
                      } else {
                        setSelectedBrands(
                          selectedBrands.filter(
                            (selectedBrand) => selectedBrand !== brand
                          )
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={brand}
                    className="peer-disabled:cursor-not-allowed select-none peer-disabled:opacity-70"
                  >
                    {brand}
                  </label>
                </div>
              </>
            ))}
          </>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg">Price Range</h3>
        <Slider.Root
          className="SliderRoot"
          defaultValue={[priceRange.min, priceRange.max]}
          max={100}
          step={1}
          onValueChange={(values) => {
            setPriceRange({
              min: (values[0] / 100) * maxPrice,
              max: (values[1] / 100) * maxPrice,
            });
          }}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
          <Slider.Thumb className="SliderThumb" aria-label="Volume" />
        </Slider.Root>
        <span>{`$${roundToTwoDecimals(priceRange.min)} - $${roundToTwoDecimals(
          priceRange.max
        )}`}</span>
      </div>
      <Button variant={"primary"} onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
