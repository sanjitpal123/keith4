import { useEffect, useState } from "react";
import FetchQuality from "../services/Quality/FetchQuality";

function Infrastructure() {
  const [QualityData, setQualityData] = useState([]);

  async function fetchquality() {
    try {
      const get = await FetchQuality();
      setQualityData(get);
      console.log("get", get);
    } catch (error) {
      console.log("error", error);
    }
  }
  const filted = QualityData?.filter(
    (item) => item.typeofproduct === "Item For Infrastructure"
  );
  
  useEffect(() => {
    fetchquality();
  }, []);
  return (
    <div className="w-full min-h-screen pt-[120px] bg-gray-100 sm:pt-[150px] flex flex-col items-center py-10">
      <h1 className=" text-xl self-start ml-4 sm:ml-16 md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">
        Infrastructure
      </h1>

    

   
      <div className="w-[90%] md:w-[80%] bg-white shadow-lg rounded-lg p-6 mb-10">
       

        {/* Mapping over filtered array to display equipment cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filted?.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 hover:cursor-pointer rounded-lg shadow-lg overflow-hidden relative group"
            >
              <img
                src={item.image || "./assets/images/default.jpg"} // Default image if none is provided
                alt={item.name || "Equipment Image"}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <p className="text-white text-center px-4">
                  {item.description || "Equipment Name"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
}

export default Infrastructure;
