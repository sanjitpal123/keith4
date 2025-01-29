import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    const mailtoLink = `mailto:your-email@example.com?subject=Contact Form Submission&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;

    window.location.href = mailtoLink;
  };
    return (
        <div className="max-w-7xl  mx-auto  mt-10 px-2 md:px-8 min-h-[100vh] space-y-9">
            <div className="">
                <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">Lets Connect </h1>
            </div>

            <div className=" text-center mx-auto space-y-3 ">
                <h1 className=" text-black text-lg sm:text-3xl gap-3">Get in touch. Call us on</h1>
                <h1 className="flex text-md  sm:text-2xl justify-center items-center text-black gap-3">
                    <span>
                        <svg className="w-[30px] size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                    </span>
                    +91 33 26775922 / 26775923</h1>
            </div>
              
            <div className="max-w-[600px]  mx-auto">
            <form onSubmit={handleSubmit} className="w-full mx-auto">
          <div className="mb-5">
            <label htmlFor="name" className="mb-2 sm:text-lg font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow-sm rounded-md w-full p-2"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="mb-2 sm:text-lg font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm rounded-md w-full p-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="mb-2 sm:text-lg font-medium text-gray-900">
              Phone No.
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow-sm rounded-md w-full p-2"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-2 sm:text-lg font-medium text-gray-900">
              Your message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="shadow-sm rounded-md w-full p-2"
              placeholder="Please write something"
              required
            ></textarea>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Submit
          </button>
        </form>

            </div>
  
        </div>
    )
}

export default ContactForm
