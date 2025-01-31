import { useState } from "react";
import SendEmail from "../services/SendEMail";

import { Bounce, ToastContainer, toast } from 'react-toastify';
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const[isloading, setisloading]=useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      setisloading(true)
    const { name, email, phone, message } = formData;
    try{
      const res=await SendEmail(formData);
      console.log('resemail',res);
      toast.success('Message sent successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        setFormData({name:"",email:"",phone:"", message:""})
      setisloading(false)
    }catch(error)
    {
      console.log('error',error)
      toast.error('Error sending message!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      setisloading(false)
    }
   

  };
    return (
        <div className="max-w-7xl  mx-auto  mt-10 px-2 md:px-8 min-h-[100vh] space-y-9">
            <ToastContainer></ToastContainer>
            <div className="">
                <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">Lets Connect </h1>
            </div>

            <div className=" text-center mx-auto space-y-3 ">
                <h1 className=" text-black text-lg sm:text-3xl gap-3">Get in touch. Call us on</h1>
                <h1 className="flex text-md sm:text-2xl justify-center items-center text-black gap-3">
                    <span className="">
                        <svg className="w-[30px] size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                    </span>
                    +91 33 26775922 / 26775923</h1>
            </div>
              
            <div className="max-w-[600px]  mx-auto">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="space-y-8">
    {/* Name & Email Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-gray-900 font-medium">Full Name</span>
          </div>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-900 font-medium">Email Address</span>
          </div>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter your mail"
          required
        />
      </div>
    </div>

    {/* Phone Number Field */}
    <div className="space-y-2">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-gray-900 font-medium">Phone Number</span>
        </div>
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-4 py-2.5 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        placeholder="Enter your contact no."
        required
      />
    </div>

    {/* Message Field */}
    <div className="space-y-2">
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-gray-900 font-medium">Your Message</span>
        </div>
      </label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        className="w-full px-4 py-2.5 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
        placeholder="Write your message here..."
        required
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="flex justify-end">
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {
          isloading?"Sending...":"Send Message"
        }
      </button>
    </div>
  </div>
</form>
      </div>
  
        </div>
    )
}

export default ContactForm;