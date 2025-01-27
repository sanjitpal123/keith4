function Principles() {
    return (
        <div className="max-w-7xl  mx-auto  mt-10 px-2 md:px-8 gap-8  py-[80px]">
             {/* heading */}
             <div>
                 <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">Management Team</h1>
             <p className="text-gray-700 text-xs sm:text-md font-medium">THESE VALUES ARE DEEPLY ROOTED IN
                     OUR RICH INDIAN CULTURE AND GUIDE US IN BUILDING LONG-TERM
                     RELATIONSHIPS BASED ON TRUST AND MUTUAL RESPECT</p>
             </div>
             {/* values container */}
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                 {/* Value Card */}
                 <div
                   className="hover:cursor-pointer max-h-[400px] rounded-md flex flex-col gap-2 items-center px-4 py-5 text-white bg-[#02245B] transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#02245B] hover:to-[#034694]"
                 >
                   <img
                     src="./assets/gifs/customer.svg"
                     className="w-[50px] h-[50px] transition-transform duration-300 hover:rotate-12"
                     alt=""
                    />
                   <h1 className="font-bold text-center sm:text-xl hover:text-[#FD5D14] transition-colors duration-300">
                     CUSTOMER-FIRST APPROACH
                   </h1>
                   <p className="sm:text-sm text-xs text-center">
                     WE HAVE ALWAYS ADOPTED A CUSTOMER-FIRST APPROACH, EVOLVING TO MEET THE
                     EVER-CHANGING NEEDS OF OUR CLIENTS, WHILE UPHOLDING THE CORE VALUES
                   </p>
                 </div>
 
                 <div
                   className="hover:cursor-pointer max-h-[400px] rounded-md flex flex-col gap-2 items-center px-4 py-5 text-white bg-[#02245B] transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#02245B] hover:to-[#034694]"
                 >
                   <img
                     src="./assets/gifs/honesty.svg"
                     className="w-[50px] h-[50px] transition-transform duration-300 hover:rotate-12"
                     alt=""
                    />
                   <h1 className="font-bold text-center sm:text-xl hover:text-[#FD5D14] transition-colors duration-300">
                     HONESTY
                   </h1>
                   <p className="sm:text-sm text-xs text-center">                    
                     WE STRIVE TO MAINTAIN COMPLETE HONESTY IN ALL OUR DEALINGS, ENSURING TRANSPARENCY AND OPEN COMMUNICATION WITH OUR CLIENTS, EMPLOYEES, AND PARTNERS.
                   </p>
                 </div>
 
                 <div
                   className="hover:cursor-pointer max-h-[400px] rounded-md flex flex-col gap-2 items-center px-4 py-5 text-white bg-[#02245B] transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#02245B] hover:to-[#034694]"
                 >
                   <img
                     src="./assets/gifs/integrity.svg"
                     className="w-[50px] h-[50px] transition-transform duration-300 hover:rotate-12"
                     alt=""
                    />
                   <h1 className="font-bold text-center sm:text-xl hover:text-[#FD5D14] transition-colors duration-300">
                     INTEGRITY
                   </h1>
                   <p className="sm:text-sm text-xs text-center">                    
                     OUR INTEGRITY IS AT THE CORE OF EVERYTHING WE DO. WE COMMIT TO HONEST, ETHICAL PRACTICES, EVEN WHEN IT &apos; S CHALLENGING, TO ALWAYS DO WHAT IS RIGHT.
                   </p>
                 </div>
 
                 <div
                   className="hover:cursor-pointer max-h-[400px] rounded-md flex flex-col gap-2 items-center px-4 py-5 text-white bg-[#02245B] transition-transform transform hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-[#02245B] hover:to-[#034694]"
                 >
                   <img
                     src="./assets/gifs/transparency.svg"
                     className="w-[50px] h-[50px] transition-transform duration-300 hover:rotate-12"
                     alt=""
                    />
                   <h1 className="font-bold text-center sm:text-xl hover:text-[#FD5D14] transition-colors duration-300">
                     TRANSPARENCY
                   </h1>
                   <p className="sm:text-sm text-xs text-center">                    
                     WE BELIEVE IN FULL TRANSPARENCY WITH ALL OUR STAKEHOLDERS, PROVIDING CLEAR, ACCURATE INFORMATION THAT ENABLES TRUST AND ALIGNMENT IN EVERY DECISION.
                   </p>
                 </div>
 
                 
          </div>
         
        </div>
    )
}

export default Principles
