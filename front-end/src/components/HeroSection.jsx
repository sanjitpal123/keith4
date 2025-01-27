import { useEffect, useState } from "react";
import FetchHeroSection from "../Services/Homepage/FetchHeading";

function HeroSection() {
  const [HeroData, setHeroData] = useState("");
  const [preview, setVideoPreview] = useState("");

  async function fetchinghero() {
    try {
      const get = await FetchHeroSection();
      console.log("Getting hero section:", get);
      setHeroData(get.gethero);
      setVideoPreview(get.gethero?.video || "https://www.w3schools.com/html/mov_bbb.mp4"); // Fallback video
    } catch (error) {
      console.error("Error fetching hero section:", error);
    }
  }

  useEffect(() => {
    fetchinghero();
  }, []);

  return (
    <div className="video-container z-[-10] mt-[100px] min-h-[90%]">
      <video autoPlay muted loop>
        {preview ? (
          <source src={preview} type="video/mp4" />
        ) : (
          <p>Video not available</p>
        )}
      </video>
      <div className="video-overlay"></div>
      <div className="content">
        <h1 className="text-xl sm:text-3xl md:text-6xl font-bold">{HeroData.content1}</h1>
        <p className="text-sm sm:text-lg md:text-xl mt-4">{HeroData.content2}</p>
      </div>
    </div>
  );
}

export default HeroSection;