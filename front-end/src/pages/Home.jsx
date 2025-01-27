import HeroSection from "../components/HeroSection"
import NavBar from "../components/NavBar"
import ShortAbout from "../components/ShortAbout"
import HomeProducts from "../components/HomeProducts"
import HomeAwards from "../components/HomeAwards"
import "../styles/Home.css"
import PrideInspiration from "../components/PrideInspiration"
import Testimonial from "../components/Testimonial"

function Home() {
    return (
        <div className="flex flex-col items-center ">

       
            {/* <NavBar></NavBar> */}
            {/* Video Background Section */}
            <HeroSection></HeroSection>
            {/* short about */}
            <ShortAbout></ShortAbout>


            {/*Years Section */}
            <div className="w-screen min-h-[100vh]">
                <div className="w-screen img h-[100vh] flex items-center justify-start">
                <div
                    className="h-auto mx-5 md:mx-10 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col rounded-md gap-4 justify-center items-center bg-gray-200 opacity-90 p-6 md:p-10"
                >
                    <h1
                    className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center text-gray-800"
                    >
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
    )
}

export default Home
