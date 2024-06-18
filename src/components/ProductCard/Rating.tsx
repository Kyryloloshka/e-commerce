import { useRating } from "@/hooks/useRating";
import React, { useEffect, useRef } from "react";

const Rating = ({ rating }: { rating: number }) => {
  useRating();
  const ratingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ratingRef.current) {
      ratingRef.current.innerHTML = rating.toString();
    }
  }, [rating]);
  return (
    <div className="rating rating_set pb-1">
      <div className="rating__body">
        <div className="rating__active"></div>
        <div className="rating__items">
          <input
            type="radio"
            className="rating__item"
            value="1"
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value="2"
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value="3"
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value="4"
            name="rating"
          />
          <input
            type="radio"
            className="rating__item"
            value="5"
            name="rating"
          />
        </div>
      </div>
      <div ref={ratingRef} className="rating__value">
        {rating}
      </div>
    </div>
  );
};

export default Rating;
