import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const BrandsFilter = ({ brands, setSelectedBrands, selectedBrands }: any) => {
  return (
    <>
      {brands.length > 1 && brands[0] !== undefined && (
        <div className="flex flex-col gap-3">
          <>
            <h3 className="text-lg">Brands</h3>
            {brands.map((brand: any) => (
              <React.Fragment key={brand}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedBrands([...selectedBrands, brand]);
                      } else {
                        setSelectedBrands(
                          selectedBrands.filter(
                            (selectedBrand: any) => selectedBrand !== brand
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
              </React.Fragment>
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default BrandsFilter;
