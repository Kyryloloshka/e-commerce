"use client"
import { useRating } from "@/hooks/useRating";
import React, { useEffect, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import "./styles.scss";

const Rating = ({ rating }: { rating: number }) => {
  useRating();
  const ratingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ratingRef.current) {
      ratingRef.current.innerHTML = rating.toString();
    }
  }, [rating]);
  return (
    <>
      <div className="rating rating_set pb-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent className="bg-primary-500 leading-[1em] text-light-3 font-semibold text-[14px] shadow-xl">
              {rating}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div ref={ratingRef} className="rating__value">
          {rating}
        </div>
      </div>
    </>
  );
};

export default Rating;
