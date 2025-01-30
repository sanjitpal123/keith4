import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { SeoContext } from "./seocontext"; 
import { useLocation } from "react-router-dom";

const SEO = () => {
  const seoData = useContext(SeoContext);
  const location = useLocation();
  const [metadata, setMetadata] = useState(null);

  // Ensure seoData is available before using
  useEffect(() => {
    if (seoData.length > 0) {
      // Map route paths to SEO type
      const routeSeoMap = {
        "/": "Seo for home page",
        "/products": "seo for product page",
        "/about": "seo for about page",
        "/contact": "seo for contact page",
        "/infrastructure": "seo for infrastructure page",
        "/quality": "seo for quality page",
      };

      const seoType = routeSeoMap[location.pathname];
      console.log("Location Pathname: ", location.pathname);
      console.log("SEO Type: ", seoType);

      const matchedMetadata = seoData.find((item) => item.typesofseo === seoType);
      console.log("Matched Metadata:", matchedMetadata);
      setMetadata(matchedMetadata);
    }
  }, [seoData, location.pathname]);

  if (!metadata) {
    return null; // Or show a loading indicator while data is fetched
  }

  return (
    <Helmet>
      <title>{metadata?.title || "Default Title"}</title>
      <meta name="description" content={metadata?.description || "Default Description"} />
      <meta name="keywords" content={metadata?.keywords || "default"} />
      <meta name="author" content={metadata?.author || "default"} />
    </Helmet>
  );
};

export default SEO;
