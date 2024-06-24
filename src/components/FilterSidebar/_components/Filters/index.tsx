import { Button } from "@/components/ui/button";
import { countDiscountedPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import BrandsFilter from "../BrandsFilter";
import PriceFilter from "../PriceFilter";

interface FiltersProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
}

const Filters = ({
  products,
  setProducts,
  setCurrentPage,
  setTotalPages,
}: FiltersProps) => {
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
      <PriceFilter
        maxPrice={maxPrice}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <Button variant={"primary"} onClick={applyFilters}>
        Apply Filters
      </Button>
    </>
  );
};

export default Filters;
