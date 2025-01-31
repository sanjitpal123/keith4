import { useEffect, useState } from "react";
import Address from "../components/Address"
import ContactForm from "../components/ContactForm"
import LoadingPage from "./LoadingPage";

function Contact() {
    const [loading, setLoading] = useState(true);
        useEffect(() => {
          setLoading(true);
          const timeout = setTimeout(() => setLoading(false), 1000); // Simulate a delay
          return () => clearTimeout(timeout);
        }, [])
    
    return (
        <>
        {
            loading?<LoadingPage></LoadingPage>:
        <section className="pt-[150px] bg-gray-100 min-h-[100vh] py-5 px-4 md:px-8 ">
        {/* heading */}
        <div>
            <h1 className="text-lg md:text-3xl font-bold text-[#02245B] mb-4">Contact Us</h1>
        </div>

        {/* Address */}
        <Address></Address>

        {/* lets connect */}
        <ContactForm></ContactForm>

        
    </section>
        }
        </>
    )
}

export default Contact
