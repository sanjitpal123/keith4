import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const SeoContext = createContext();

export const SeoProvider = ({ children }) => {
  const [seoData, setSeoData] = useState([]);

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/getmetadata`);
        console.log("Fetched SEO Data:", res.data); // Log fetched data
        setSeoData(res.data);
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };

    fetchSEO();
  }, []);

  return <SeoContext.Provider value={seoData}>{children}</SeoContext.Provider>;
};
