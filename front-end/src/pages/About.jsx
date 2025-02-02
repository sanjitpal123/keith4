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
import FetchAboutHeading from "../services/AboutPage/FetchAboutHeading";
import { motion } from "framer-motion";

function About() {
    const [metadata, setMetadata] = useState(null);
    const [whoweare, setWhoweare] = useState("");
    const [Aboutdata, setAboutdata] = useState("");

    async function fetchAbout() {
        try {
            const res = await FetchAboutHeading();
            setAboutdata(res);
        } catch (error) {
            console.log("error", error);
        }
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        fetchAbout();
    }, []);

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

    const fadeLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    };

    return (
        <>
            {loading ? (
                <LoadingPage />
            ) : (
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
                    <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }}>
                    </motion.div>

                    {/* Who We Are Section */}
                    <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }} className="max-w-7xl mt-10 px-2 md:px-8 gap-8">
                        {/* Text Section */}
                        <div className="w-full mx-auto md:text-left">
                            <h1 className="text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">
                                {Aboutdata?.header}
                            </h1> 
                            <motion.div initial="hidden" whileInView="visible" variants={fadeRight} viewport={{ amount: "some" }} className="mt-6 ">
                            
                            <div className="max-w-[600px] mb-4">
                                <img
                                    className="rounded-lg shadow-lg w-full"
                                    src={Aboutdata?.image}
                                    alt="Who we are"
                                />
                            </div>
                            </motion.div>
                            <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }}>
                            <div
                            className="space-y-2 text-left text-gray-700 w-full  text-sm md:text-md font-medium leading-loose"
                            dangerouslySetInnerHTML={{ __html: Aboutdata?.content }}
                            ></div>
                            </motion.div>

                        </div>
                        {/* Image Section */}
                       
                    </motion.div>

                    {/* Other Components with scroll-based animation */}
                    <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }}>
                        <History />
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" variants={fadeRight} viewport={{ amount: "some" }}>
                        <MissionVision />
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }}>
                        <Principles />
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" variants={fadeRight} viewport={{ amount: "some" }}>
                        <TeamManagement />
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" variants={fadeLeft} viewport={{ amount: "some" }}>
                        <WhyUs />
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" variants={fadeRight} viewport={{ amount: "some" }}>
                        <Awards />
                    </motion.div>
                </section>
            )}
        </>
    );
}

export default About;