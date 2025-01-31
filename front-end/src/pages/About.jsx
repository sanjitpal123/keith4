import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Awards from "../components/Awards";
import History from "../components/History";
import MissionVision from "../components/MissionVision";
import Principles from "../components/Principles";
import TeamManagement from "../components/TeamManagement";
import WhyUs from "../components/WhyUs";
import Getseo from "../services/FetchSeo";
import LoadingPage from "./LoadingPage";

function About() {
    const [metadata, setMetadata] = useState(null);
    const[whoweare, setwhoweare]=useState("");
    async function fetchwhoweare(params) {
        
    }
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 1000); // Simulate a delay
      return () => clearTimeout(timeout);
    }, [])

    useEffect(() => {
        async function fetchSeo() {
            try {
                const res = await Getseo();
                const seoforabout = res.find((data) => data.typesofseo === "seo for about page");
                setMetadata(seoforabout || {});
            } catch (error) {
                console.error("Error fetching SEO data", error);
            }
        }
        fetchSeo();
    }, []);
    console.log('mea',metadata)

    return (
        <>
        {
            loading?<LoadingPage></LoadingPage>:
        <section className="pt-[150px] bg-gray-100 px-4 md:px-8">
            {metadata && (
                <Helmet>
                    <title>{metadata.title || "About Us"}</title>
                    <meta name="description" content={metadata.description || "Learn more about us"} />
                    <meta name="keywords" content={metadata.keywords || "About Us, Company, Team"} />
                    <meta name="author" content={metadata.author || "Keith Ceramic"} />
                </Helmet>
            )}

            {/* Heading */}
            <div>
                <h1 className="text-3xl font-bold text-[#02245B] mb-4">About Us</h1>
            </div>

            {/* Who We Are Section */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-around items-center mt-10 px-2 md:px-8 gap-8">
                {/* Text Section */}
                <div className="max-w-[700px] md:text-left">
                    <h1 className="text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">
                        Who we are?
                    </h1>
                    <ul className="space-y-2 text-left text-gray-700 text-sm md:text-md font-medium leading-loose">
                        <li>▣ KEITH CERAMIC (KTC): LEADING & WELL-ESTABLISHED MANUFACTURER & EXPORTER OF GREY IRON CASTINGS SINCE 1992</li>
                        <li>▣ STRATEGIC LOCATION FOR EFFICIENT OPERATIONS</li>
                        <li>▣ ACCESS TO KEY RAW MATERIALS</li>
                    </ul>
                </div>
                {/* Image Section */}
                <div className="mt-6 max-w-[500px]">
                    <img
                        className="rounded-lg shadow-lg w-full"
                        src="https://images.pexels.com/photos/6754758/pexels-photo-6754758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Who we are"
                    />
                </div>
            </div>

            {/* Other Components */}
            <History />
            <MissionVision />
            <Principles />
            <TeamManagement />
            <WhyUs />
            <Awards />
        </section>
        }
        </>
    );
}

export default About;
