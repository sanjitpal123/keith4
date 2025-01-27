import { useState } from 'react';

const VirtualTour = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = (e) => {
    const video = e.target;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-[80vh] w-full bg-gray-100 py-16 px-4 flex flex-col items-center justify-center">
        <h1 className="self-start md:ml-14 text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">Our Virtual tour</h1>
                        
      <div className="max-w-screen-xl mx-auto flex flex-col justify-center items-center space-y-8 px-4 md:px-8 w-full">
        
        {/* Heading Section - Positioned at the Top Left */}
        <h1 className="text-4xl font-bold text-white border-l-4 border-blue-800 pl-4 absolute top-16 left-8 z-10">
          Our Virtual Tour
        </h1>

        {/* Video Section */}
        <div className="relative w-full max-w-full">
          <video
            className="w-full h-auto rounded-lg cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105"
            onClick={handleVideoClick}
            controls
            src="./assets/videos/random.mp4" // Replace with your actual video path
            alt="Virtual Tour Video"
          />
          {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-opacity duration-300">
            <span className="text-white text-3xl font-bold">Click to Play</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
