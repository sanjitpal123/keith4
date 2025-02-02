import { useEffect, useState, useRef } from "react";
import Gettourvidoe from "../services/Homepage/GetTourVIdeo";

const VirtualTour = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [video, setVideo] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const videoRef = useRef(null);

  const generateThumbnail = (videoUrl) => {
    const videoElement = document.createElement("video");
    videoElement.crossOrigin = "anonymous";
    videoElement.src = videoUrl;

    const handleLoadedMetadata = () => {
      videoElement.currentTime = 9.50;
    };

    const handleSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          setThumbnailUrl(url);
        },
        "image/jpeg",
        0.9
      );
    };

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    videoElement.addEventListener("seeked", handleSeeked);
    videoElement.load();

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.removeEventListener("seeked", handleSeeked);
    };
  };

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

  async function fetchVideoOfVirtualTour() {
    try {
      const get = await Gettourvidoe();
      setVideo(get);
    } catch (error) {
      console.log("Error fetching video:", error);
    }
  }

  useEffect(() => {
    fetchVideoOfVirtualTour();
  }, []);

  useEffect(() => {
    if (video?.video) {
      generateThumbnail(video.video);
    }
  }, [video?.video]);

  useEffect(() => {
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailUrl]);

  return (
    <div className="min-h-[80vh] w-full bg-gray-100 py-16 px-4 flex flex-col items-center justify-center">
      <h1 className="self-start md:ml-10 text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">
        Our Virtual Tour
      </h1>

      <div className="max-w-screen-xl mx-auto flex flex-col justify-center items-center space-y-8 px-4 md:px-8 w-full">
        <div className="relative w-full max-w-full">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg cursor-pointer transform transition-all duration-300 ease-in-out"
            onClick={handleVideoClick}
            controls
            poster={thumbnailUrl}
            src={video?.video}
            alt="Virtual Tour Video"
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;