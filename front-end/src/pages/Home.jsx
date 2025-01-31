import HeroSection from "../components/HeroSection";
import { useState } from "react";
import NavBar from "../components/NavBar";
import ShortAbout from "../components/ShortAbout";
import HomeProducts from "../components/HomeProducts";
import HomeAwards from "../components/HomeAwards";
import "../styles/Home.css";
import PrideInspiration from "../components/PrideInspiration";
import Testimonial from "../components/Testimonial";
import VirtualTour from "../components/VirtualTour";
import { useEffect } from "react";
import Getbackroundyear from "../services/Homepage/fetchyearbacround";
import LoadingPage from "./LoadingPage";

function Home() {
    const [backgroundImage, setBackgroundImage] = useState(""); // State for storing image URL
    
    async function Fetchyear() {
      try {
        const get = await Getbackroundyear();
        console.log("Fetched Background:", get);
        
        if (get?.image) {
          setBackgroundImage(get.image); // Update state with the image URL
        }
      } catch (error) {
        console.log("Error fetching background:", error);
      }
    }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 1000); // Simulate a delay
      return () => clearTimeout(timeout);
    }, [])
    useEffect(() => {
      Fetchyear();
    }, []);
  return (
    <>
    {
      loading ? <LoadingPage></LoadingPage>:

    <div className="flex flex-col items-center ">
      {/* <NavBar></NavBar> */}
      {/* Video Background Section */}
      
      
      <HeroSection></HeroSection>
      {/* short about */}
      <ShortAbout></ShortAbout>

      {/*Years Section */}
      <div className="w-screen min-h-[100vh]">
      <div
          className="w-screen h-[100vh] flex items-center justify-start"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="h-auto mx-5 md:mx-10 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col rounded-md gap-4 justify-center items-center bg-gray-200 opacity-90 p-6 md:p-10">
            <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center text-gray-800">
              Over a million square feet of inventory to serve you across the
              U.S.
            </h1>
            <img
              src="./assets/images/logo.png"
              alt="Logo"
              className="h-[50px] md:h-[80px] lg:h-[100px] object-contain"
            />
          </div>
        </div>
      </div>
      {/* virutal tour */}
      <VirtualTour></VirtualTour>
      {/*product  section*/}
      <HomeProducts></HomeProducts>

      {/*Our Pride our Inspiration */}
      <PrideInspiration></PrideInspiration>
      {/*Awards */}
      <HomeAwards></HomeAwards>
      {/* testimonial */}
      <Testimonial></Testimonial>

      {/* <Footer></Footer> */}      
    </div>
    }
    </>

  );
}

export default Home; //helo
