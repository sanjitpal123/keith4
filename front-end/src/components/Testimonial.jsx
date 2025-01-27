import React, { useEffect, useRef } from 'react';
import { initializeKeenSlider } from './KeenSlider';

const TestimonialSlider = () => {
  const sliderRef = useRef(null);
  const prevDesktopRef = useRef(null);
  const nextDesktopRef = useRef(null);
  const prevMobileRef = useRef(null);
  const nextMobileRef = useRef(null);

  useEffect(() => {
    // Pass both desktop and mobile refs to the KeenSlider initialization
    const destroySlider = initializeKeenSlider(sliderRef, prevDesktopRef, nextDesktopRef, prevMobileRef, nextMobileRef);

    return () => destroySlider(); // Cleanup on unmount
  }, []);

  return (
    <section className="bg-gray-100 w-full flex justify-center">
      <div className="mx-auto sm:mx-4 max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-xl text-left border-l-4 px-3 border-blue-600 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Don &apos; t just take our word for it...
            </h2>
            <p className="mt-4 text-left text-gray-700">
              Discover how we &apos; ve made a difference! Hear directly from our satisfied customers about their experiences and
              why they trust us to deliver exceptional quality every time.
            </p>
            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              {/* Desktop Previous Button */}
              <button
                aria-label="Previous slide"
                ref={prevDesktopRef}
                className="rounded-full border border-[#FD5D14] p-3 text-[#FD5D14] transition hover:bg-[#FD5D14] hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 rtl:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              {/* Desktop Next Button */}
              <button
                aria-label="Next slide"
                ref={nextDesktopRef}
                className="rounded-full border border-[#FD5D14] p-3 text-[#FD5D14] transition hover:bg-[#FD5D14] hover:text-white"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="-mx-6 py-2 lg:col-span-2 rounded-lg sm:shadow-xl px-4 sm:px-5 lg:mx-0">
            <div ref={sliderRef} className="keen-slider">
              {/* Slides */}
              <div className="keen-slider__slide">
                <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                  <div>
                    <div className="flex gap-0.5 text-[#FD5D14]">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="size-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-[#02245B] sm:text-3xl">Best Quality</p>
                      <p className="mt-4 leading-relaxed text-gray-700">
                        No, Rose, they are not breathing. And they have no arms or legs... Where are they? You know
                        what? If we come across somebody with no arms or legs, do we bother resuscitating them?
                      </p>
                    </div>
                  </div>
                  <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">&mdash; Mac Johnson</footer>
                </blockquote>
              </div>
              {/* Repeat similar slides */}
              <div className="keen-slider__slide">
                <blockquote className="flex h-full flex-col justify-between bg-white p-6 shadow-sm sm:p-8 lg:p-12">
                  <div>
                    <div className="flex gap-0.5 text-[#FD5D14]">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="size-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-[#02245B] sm:text-3xl">Best Quality</p>
                      <p className="mt-4 leading-relaxed text-gray-700">
                        No, Rose, they are not breathing. And they have no arms or legs... Where are they? You know
                        what? If we come across somebody with no arms or legs, do we bother resuscitating them?
                      </p>
                    </div>
                  </div>
                  <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">&mdash; Mac Johnson</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default TestimonialSlider;
