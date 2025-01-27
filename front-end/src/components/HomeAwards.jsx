import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FetchCertificates from '../services/AboutPage/FetchCertificates';

const HomeAwards = () => {
  const[certificatedata, setcertificatedata]=useState([])
  async function Fetchallcertificates()
  {
    try{
      const getting=await FetchCertificates();
      console.log('getting',getting);
      setcertificatedata(getting);

    }
    catch(error){
      console.log('error');

    }

  }
  useEffect(()=>{
    Fetchallcertificates();
  },[])

  const [currentIndex, setCurrentIndex] = useState(0);

  // List of slides (images)
  const slides = [
    {
      src: 'https://sipindustries.com/wp-content/uploads/2022/12/HMSDC-Certificate.jpg',
      alt: 'Certificate 1',
    },
    {
      src: 'https://sipindustries.com/wp-content/uploads/2022/12/Supplier-Clearinghouse-Certificate.png',
      alt: 'Certificate 2',
    },
    {
      src: 'https://sipindustries.com/wp-content/uploads/2022/12/SIP-Texas-HUB-Certification.jpg',
      alt: 'Certificate 3',
    },
  ];

  // Function to show the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  // Function to show the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-[50vh] w-[100vw] py-6 px-2 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col justify-around items-start mt-10 px-2 md:px-8 md:gap-8">
        {/* Text Section */}
        <div>
          <h1 className="text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">
            Awards
          </h1>
        </div>

        {/* Details and image */}
        <div className="flex gap-4 w-full justify-around items-start flex-col">
          {/* Image Section */}
          <div className="slider relative w-full h-[200px] mx-auto sm:h-[300px] lg:w-[800px] lg:h-[400px] overflow-hidden rounded-lg shadow-lg">
            {/* Slides */}
            {certificatedata?.map((slide, index) => (
              <div
                key={index}
                className={`slide w-full h-full absolute top-0 left-0 transition-all duration-1000 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              className="left font-bold text-lg md:text-xl absolute top-[50%] left-[10px] z-10 bg-black/50 text-white px-2 py-1 md:px-3 rounded-full hover:bg-black/70 transition"
              onClick={prevSlide}
            >
              ←
            </button>
            <button
              className="right font-bold text-lg md:text-xl absolute top-[50%] right-[10px] z-10 bg-black/50 text-white px-2 py-1 md:px-3 rounded-full hover:bg-black/70 transition"
              onClick={nextSlide}
            >
              →
            </button>

            {/* Indicators */}
            <div className="indicators absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 bg-white rounded-full transition ${
                    index === currentIndex ? 'opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="max-w-[900px] lg:mx-auto py-4 md:text-left">
            <div className="space-y-2 text-left text-gray-700 text-sm md:text-md font-medium leading-loose">
              <p className="text-lg mb-6">
                Our Awards and Certifications section highlights the milestones
                and accolades that showcase our commitment to excellence and
                trust. From prestigious certifications in quality and
                compliance to industry-recognized achievements, each award
                represents a testament to our dedication, innovation, and
                expertise. These honors inspire us to continue delivering
                exceptional value to our partners and clients.
              </p>
              <button className="flex bg-[#FD5D14] p-1 sm:p-2 rounded-md text-white">
                <Link to="/about"
                  className="flex gap-2 items-center"
                  href="about.html"
                >
                  See more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAwards;
