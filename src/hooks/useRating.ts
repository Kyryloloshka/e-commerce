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

        if (rating.classList.contains('rating_set')) {
          setRating(rating);
        }
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

      function setRating(rating: HTMLElement) {
        const ratingItems = rating.querySelectorAll('.rating__item');
        for (let index = 0; index < ratingItems.length; index++) {
          const ratingItem = ratingItems[index] as HTMLInputElement;
          ratingItem.addEventListener('click', function () {
            initRatingVars(rating);

            if (rating.dataset.ajax) {
              setRatingValue(ratingItem.value, rating);
            } else {
              if (ratingValue) {
                ratingValue.innerHTML = (index + 1).toString();
                setRatingActiveWidth();
              }
            }
          });
        }
      }

      async function setRatingValue(value: string, rating: HTMLElement) {
        if (!rating.classList.contains('rating_sending')) {
          rating.classList.add('rating_sending');
          let response = await fetch('rating.json', {
            method: 'GET',
          });

          if (response.ok) {
            const result = await response.json();
            const newRating = result.newRating;

            if (ratingValue) {
              ratingValue.innerHTML = newRating;
              setRatingActiveWidth();
              rating.classList.remove('rating_sending');
            }
          } else {
            alert("Помилка");
            rating.classList.remove('rating_sending');
          }
        }
      }
    }
  }, []);
};
