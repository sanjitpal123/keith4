import KeenSlider from 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/+esm';

export const initializeKeenSlider = (sliderRef, prevRef, nextRef) => {
  const slider = new KeenSlider(sliderRef.current, {
    loop: true,
    slides: {
      origin: 'center',
      perView: 1.25,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 1024px)': {
        slides: {
          origin: 'auto',
          perView: 1.5,
          spacing: 32,
        },
      },
    },
  });

  if (prevRef.current) {
    prevRef.current.addEventListener('click', () => slider.prev());
  }

  if (nextRef.current) {
    nextRef.current.addEventListener('click', () => slider.next());
  }

  return () => slider.destroy();
};
