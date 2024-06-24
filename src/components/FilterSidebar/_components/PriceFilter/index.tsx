import { roundToTwoDecimals } from '@/lib/utils';
import * as Slider  from '@radix-ui/react-slider';
import React from 'react'
const PriceFilter = ({priceRange, setPriceRange, maxPrice}: any) => {
	return (
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
  );
}

export default PriceFilter
