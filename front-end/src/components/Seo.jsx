import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

import Getseo from "../services/FetchSeo";

const SEO = () => {
  const [metadatas, setmetadata]=useState(null);
  async function fetchmetadata()
  {
    try{
         const get=await Getseo();
         console.log('get',get);
    }catch(error)
    {
        console.log('error',error);
    }
  }

  useEffect(() => {
    fetchmetadata();
  }, []);

  return (
    <Helmet>
      <title>{metadatas?.title}</title>
      <meta name="description" content={metadatas?.description} />
      <meta name="keywords" content={metadatas?.keywords} />
      <meta name="author" content={metadatas?.author} />
    </Helmet>
  );
};

export default SEO;
