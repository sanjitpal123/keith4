import HeroSection from "../components/HeroSection";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import ShortAbout from "../components/ShortAbout";
import HomeProducts from "../components/HomeProducts";
import HomeAwards from "../components/HomeAwards";
import "../styles/Home.css";
import PrideInspiration from "../components/PrideInspiration";
import Testimonial from "../components/Testimonial";
import VirtualTour from "../components/VirtualTour";
import Getbackroundyear from "../services/Homepage/fetchyearbacround";
import LoadingPage from "./LoadingPage";
import Getseo from "../services/FetchSeo";
import { Helmet } from "react-helmet-async";

function Home() {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [metadata, setmetadata] = useState("");

  async function Fetchyear() {
    try {
      const get = await Getbackroundyear();
      console.log("Fetched Background:", get);
      if (get?.image) {
        setBackgroundImage(get.image);
      }
    } catch (error) {
      console.log("Error fetching background:", error);
    }
  }

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  async function fetchseo() {
    try {
      const data = await Getseo();
      console.log("SEO Data:", data);
      const seoforhome = data.find((item) => item.typesofseo === "Seo for home page");
      if (seoforhome) {
        setmetadata(seoforhome);
      } else {
        console.warn("No SEO data found for home page");
      }
    } catch (error) {
      console.error("Error fetching SEO data:", error.message);
    }
  }

  useEffect(() => {
    Fetchyear();
    fetchseo();
  }, []);

  const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex bg-gray-100 flex-col items-center">
          <Helmet>
            {/* Title and Description */}
            <title>{metadata?.title || "Keith Ceramic - Premium Handmade Ceramics"}</title>
            <meta name="description" content={metadata?.description || "Shop premium handmade ceramics at Keith Ceramic. Explore our finest collection of pottery and home decor."} />
            <meta name="keywords" content={metadata?.keywords || "handmade ceramics, pottery, home decor, Keith Ceramic, ceramic art"} />
            <meta name="author" content={metadata?.author || "Keith Ceramic"} />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={metadata?.title || "Keith Ceramic - Handmade Ceramics"} />
            <meta property="og:description" content={metadata?.description || "Explore premium handmade ceramics at Keith Ceramic."} />
            <meta property="og:image" content="https://yourwebsite.com/assets/images/logo.png" />
            <meta property="og:url" content="https://yourwebsite.com/" />
            <meta property="og:type" content="website" />

            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metadata?.title || "Keith Ceramic - Handmade Ceramics"} />
            <meta name="twitter:description" content={metadata?.description || "Shop premium handmade ceramics at Keith Ceramic."} />
            <meta name="twitter:image" content="https://yourwebsite.com/assets/images/logo.png" />

            {/* Canonical URL */}
            <link rel="canonical" href="https://yourwebsite.com/" />

            {/* Preload Background Image */}
            <link rel="preload" as="image" href={backgroundImage} />
          </Helmet>

          <HeroSection />

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeLeft}
            viewport={{ amount: "some" }}
          >
            <ShortAbout />
          </motion.div>

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
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={fadeRight}
                viewport={{ amount: "some" }}
                className="h-auto mx-5 md:mx-10 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col rounded-md gap-4 justify-center items-center bg-gray-200 opacity-90 p-6 md:p-10"
              >
                <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center text-gray-800">
                  Keith Ceramic - Premium Handmade Pottery
                </h1>
                <img
                  src="./assets/images/logo.png"
                  alt="Keith Ceramic Handmade Pottery Logo"
                  loading="lazy"
                  className="h-[50px] md:h-[80px] lg:h-[100px] object-contain"
                />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeLeft}
            viewport={{ amount: "some" }}
          >
            <VirtualTour />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeRight}
            viewport={{ amount: "some" }}
          >
            <HomeProducts />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeLeft}
            viewport={{ amount: "some" }}
          >
            <PrideInspiration />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeRight}
            viewport={{ amount: "some" }}
          >
            <HomeAwards />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeLeft}
            viewport={{ amount: "some" }}
          >
            <Testimonial />
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Home;
