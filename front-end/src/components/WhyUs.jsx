function WhyUs() {
    return (
        <div className="max-w-7xl  mx-auto  items-center mt-10 px-2  gap-8  py-[80px]">
          {/* heading */}
          <div >
            <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">Why Keith Ceramic ?</h1>
          </div>

          {/* details */}
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row justify-around items-center mt-10 px-2 md:px-8 gap-8">
            {/* Text Section */}
            <div className="max-w-[700px]  md:text-left">
                <ul className="space-y-2 text-left text-gray-700 text-sm md:text-md font-medium  leading-loose">
                    <li >▣ 
                        KEITH CERAMIC (KTC): LEADING & WELL-ESTABLISHED MANUFACTURER & 
                    EXPORTER OF GREY IRON CASTINGS SINCE 1992 <br></br>
                    KEITH CERAMIC (KTC) IS A FAMILY-OWNED BUSINESS WITH OVER THREE DECADES 
                    OF EXPERIENCE IN MANUFACTURING GREY IRON CASTINGS. FOUNDED IN 1992, WE 
                    HAVE BECOME A DISTINGUISHED MANUFACTURER AND EXPORTER OF HIGH
                    QUALITY GREY IRON CASTINGS WITH AN ANNUAL INSTALLED PRODUCTION 
                    CAPACITY OF 30,000 MT. <br></br>
                    </li>
                    <li>▣ STRATEGIC LOCATION FOR EFFICIENT OPERATIONS <br></br>
                        KTC IS STRATEGICALLY LOCATED WITH EASY ACCESS TO 2 NEARBY PORTS AND A 
                        RAILWAY STATION, MAKING IT EASIER TO TRANSPORT MULTI-AXLE GOODS 
                        EFFICIENTLY. OUR FACILITY IS CONVENIENTLY SITUATED ALONG A NATIONAL 
                        HIGHWAY, ENSURING SMOOTH LOGISTICS AND TIMELY DELIVERY. </li>
                    <li>▣ ACCESS TO KEY RAW MATERIALS <br></br>
                        OUR SITE IS IN CLOSE PROXIMITY TO ESSENTIAL RAW MATERIALS SUCH AS PIG IRON, 
                        HARD COKE, SCRAP, AND FERRO ALLOYS, ALLOWING US TO MAINTAIN A 
                        CONSISTENT SUPPLY CHAIN AND PRODUCE HIGH-QUALITY CASTINGS.</li>
                    
                </ul>
                </div>
            {/* Image Section */}
            <div className="mt-6 max-w-[500px]  ">
                <img className="rounded-lg  w-full" src="./assets/gifs/the-gif.gif" alt="Who we are" />
                {/* <img className="rounded-lg  w-full" src="./assets/gifs/the-gif.gif" alt="Who we are" /> */}
            </div>
          </div>
        </div>
    )
}

export default WhyUs
