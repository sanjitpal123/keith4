import { useEffect, useState } from "react";
import FetchAllProducts from "../services/ProductPage/FetchAllProducts";
function AgriculturalCastings() {
  // Example products data
  // const products = [
  //     { name: "CROSS COMBI RING", image: "/assets/images/products/agricultural-castings/CROSS COMBI RING-min.JPG" },
  //   { name: "CROSS KILL RING", image: "/assets/images/products/agricultural-castings/CROSS KILL RING-min.JPG" },
  //   { name: "GLAT END RING SNOWFLAKE 55 CM", image: "/assets/images/products/agricultural-castings/GLAT END RING SNOWFLAKE 55 CM-min.JPG" },
  //   { name: "JAGGED RING", image: "/assets/images/products/agricultural-castings/JAGGED RING-min.JPG" },
  //   { name: "PACKER RING 80 CM MODIFIED", image: "/assets/images/products/agricultural-castings/PACKER RING 80 CM MODIFIED-min.JPG" },
  //   { name: "PACKER RING 80 CM ", image: "/assets/images/products/agricultural-castings/PACKER RING 80 CM-min.JPG" },
  //   { name: "PACKER RING 80", image: "/assets/images/products/agricultural-castings/PACKER RING-min.JPG" },
  //   { name: "SMOOTH RING SNOWFLAKE & TAKKET RING", image: "/assets/images/products/agricultural-castings/SMOOTH RING SNOWFLAKE & TAKKET RING-min.JPG" },
  //   { name: "WAVED RING 50 CM", image: "/assets/images/products/agricultural-castings/WAVED RING 50 CM-min.JPG" },
    
  //   // Add more products as needed
  // ];
  const [products,setAllProducts]=useState()

  function filterProducts(items){
    setAllProducts(items.filter(item=>item.typeofproduct==="Agricultural Castings"))
  }

  async function fetchingAgriculturalCastings(){
    try {
      const res = await FetchAllProducts()
      // console.log(res)
      filterProducts(res)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchingAgriculturalCastings()
  },[])
  return (
    <div className="min-h-[60vh] w-full sm:py-6 px-2 py-2 sm:px-6 bg-gray-100">
      {/* Section Title */}
      <div className="text-left lg:ml-14 mb-10">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#FD5D14] border-l-4 border-blue-700 pl-4 mb-6">
          Agricultural Castings
        </h1>
      </div>

      {/* Products Grid Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {products?.map((product, index) => (
          <div
            key={index}
            className="relative hover:cursor-pointer space-y-2 bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-48 object-contain"
            />
            <div className="px-4 py-2 text-left">
              <h2 className="text-md sm:text-lg  text-slate-500">{product.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );//hello
}

export default AgriculturalCastings;
