import FetchCoreAndPrinciple from "../services/AboutPage/FetchCoreAndPrinciple";

import { useState, useEffect } from "react";
function MissionVision() {
  const [data, setdata] = useState([]);

  async function getallteammanagement() {
    try {
      const get = await FetchCoreAndPrinciple();
      console.log("gehhht", get);
      setdata(get);
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    getallteammanagement();
  }, []);
  return (
    <div className="max-w-7xl  mx-auto md:flex-row justify-around items-center mt-10 px-2 md:px-8 gap-8  py-[80px]">
      {/* heading */}
      <div>
        <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">
          Principles & core values
        </h1>
      </div>

      <div className="flex h-full flex-col md:flex-row gap-4">
        {/* Mission */}
        {data?.map((item) => (
          <div key={item._id} className="relative rounded-lg w-full md:w-1/2 h-64 md:h-96 overflow-hidden group">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="text-white flex flex-col gap-7 h-full text-lg font-bold p-2 sm:p-6">
                <h1 className="sm:text-2xl">{item?.title}</h1>
                <ul className=" space-y-2 sm:space-y-4 text-xs sm:text-sm md:text-lg font-light leading-relaxed">
                  <li>
                    ▣ {item?.description}
                  </li>
                
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Vision */}
      
      </div>
    </div>
  );
}

export default MissionVision;