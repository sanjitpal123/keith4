import { useEffect, useState } from "react";
import Fetchhistoryall from "../services/AboutPage/FetchHistory";

function History() {
  const [getallhistory, setallhistory] = useState([]);

  async function fetchallhistory() {
    try {
      const getall = await Fetchhistoryall();
      console.log("history", getall);
      setallhistory(getall);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchallhistory();
  }, []);

  return (
    <div className="w-[90vw] mx-auto md:max-w-7xl mt-[100px] md:mt-[250px] flex flex-col gap-8">
      <h1 className="text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4">
        Our History
      </h1>
      <ul className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 transform -translate-x-1/2 sm:block hidden"></div>

        {getallhistory?.map((item, index) => (
          <li
            key={index}
            className={`relative mb-12 flex sm:items-center ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            } sm:flex-row flex-col items-start`}
          >
            {/* Timeline Connector */}
            <div className="absolute  justify-center items-center top-0 left-1/2 transform -translate-x-1/2 bg-[#FD5D14] h-4 w-4 rounded-full z-10 sm:block hidden "></div>

            {/* Timeline Content */}
            <div
              className={`bg-[#02245B] text-white px-4 py-4 rounded-lg shadow-md sm:w-[40%] w-full ${
                index % 2 === 0 ? "sm:mr-4 sm:text-left" : "sm:ml-4 sm:text-right"
              }`}
            >
              <time className="block text-lg font-semibold">{item.date}</time>
              <p className="mt-1 text-sm">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;