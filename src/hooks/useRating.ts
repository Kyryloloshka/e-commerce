"use client"
import { useEffect } from 'react';

export const useRating = () => {
  useEffect(() => {
    const ratings = document.querySelectorAll('.rating');
    if (ratings.length > 0) {
      initRatings();
    }

    function initRatings() {
      let ratingActive: HTMLElement | null;
      let ratingValue: HTMLElement | null;

      for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index] as HTMLElement;
        initRating(rating);
      }

      function initRating(rating: HTMLElement) {
        initRatingVars(rating);

        setRatingActiveWidth();

      }

      function initRatingVars(rating: HTMLElement) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
      }

      function setRatingActiveWidth(index = parseFloat(ratingValue?.innerHTML || '0')) {
        if (ratingActive) {
          const ratingActiveWidth = index / 0.05;
          ratingActive.style.width = `${ratingActiveWidth}%`;
        }
      }


    }
  }, []);
};
