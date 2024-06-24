import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { countDiscountedPrice, roundToTwoDecimals } from "@/lib/utils";
import { Product } from "@/types";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import BrandsFilter from "../BrandsFilter";

const Filters = ({
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
    <>
      <BrandsFilter
        brands={brands}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
      />
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
    </>
  );
};

export default Filters;
