import Address from "../components/Address"
import ContactForm from "../components/ContactForm"

function Contact() {
    return (
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
    )
}

export default Contact
