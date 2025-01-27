function ContactForm() {
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
                <form className="w-full  mx-auto">
                    {/* your name */}
                    <div className="mb-5 ">
                        <label htmlFor="name" className=" mb-2 sm:text-lg flex items-center gap-3  font-medium text-gray-900 ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                          </svg>
                          Name
                        </label>
                        <input type="text" id="name" className="shadow-sm rounded-md w-full " placeholder="Enter your name" required />
                    </div>
                    {/* your mail */}
                    <div className="mb-5 ">
                      <label htmlFor="name" className=" mb-2 sm:text-lg flex items-center gap-3  font-medium text-gray-900 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        
                        Email
                      </label>
                      <input type="text" id="name" className="shadow-sm rounded-md w-full " placeholder="Enter your mail" required  />
                  </div>
                    {/* phone no */}
                    <div className="mb-5 ">
                      <label htmlFor="name" className=" mb-2 sm:text-lg flex items-center gap-3  font-medium text-gray-900 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        
                        Phone No.
                      </label>
                      <input type="text" id="name" className="shadow-sm rounded-md w-full " placeholder="Enter your phone no." required  />
                  </div>
                    {/* write something */}
                    <div className="mb-5">
                      <label htmlFor="name" className=" mb-2 sm:text-lg flex items-center gap-3  font-medium text-gray-900 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>  
                        Your message
                      </label>
                      
                      <textarea 
                          id="phone_no" 
                          rows="4" 
                          className="shadow-sm rounded-md w-full p-2 "
                          placeholder="Please write something"
                          required
                        ></textarea>
                      </div>
                      
                    <div className="flex items-start mb-5">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit </button>
                    </div>
                </form>

            </div>
  
        </div>
    )
}

export default ContactForm
