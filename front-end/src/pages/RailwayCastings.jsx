import { useEffect, useState } from "react";
import FetchAllProducts from "../services/ProductPage/FetchAllProducts";

function RailwayCastings() {
  // Example products data
  // const products = [
  //     { name: "'A' TYPE FOUNDATION", image: "/assets/images/products/railway-castings/'A' TYPE FOUNDATION-min.JPG" },
  //     { name: "2 ASPECT BODY & COVER", image: "/assets/images/products/railway-castings/2 ASPECT BODY & COVER-min.JPG" },
  //     { name: "3 ASPECT BODY & COVER", image: "/assets/images/products/railway-castings/3 ASPECT BODY & COVER-min.JPG" },
  //     { name: "BRAKE BLOCK FOR DHR", image: "/assets/images/products/railway-castings/BRAKE BLOCK FOR DHR-min.JPG" },
  //     { name: "BRAKE BLOCK FOR DIESEL LOCO", image: "/assets/images/products/railway-castings/BRAKE BLOCK FOR DIESEL LOCO-min.JPG" },
  //     { name: "BRAKE BLOCK FOR NG COACH", image: "/assets/images/products/railway-castings/BRAKE BLOCK FOR NG COACH-min.JPG" },
  //     { name: "BRAKE BLOCK", image: "/assets/images/products/railway-castings/BRAKE BLOCK-min.JPG" },
  //     { name: "LADDER BASE", image: "/assets/images/products/railway-castings/LADDER BASE-min.JPG" },
  //     { name: "MOUNTING SOCKET FOR CLS", image: "/assets/images/products/railway-castings/MOUNTING SOCKET FOR CLS-min.JPG" },
  //     { name: "OFFSET BRACKET FOR CLS", image: "/assets/images/products/railway-castings/OFFSET BRACKET FOR CLS-min.JPG" },
  //     { name: "OFFSET BRACKET FOR SHUNT SIGNAL", image: "/assets/images/products/railway-castings/OFFSET BRACKET FOR SHUNT SIGNAL-min.JPG" },
  //     { name: "SHUNT SIGNAL BASE", image: "/assets/images/products/railway-castings/SHUNT SIGNAL BASE-min.JPG" },
  //     { name: "SHUNT SIGNAL BODY", image: "/assets/images/products/railway-castings/SHUNT SIGNAL BODY-min.JPG" },
  //     { name: "SIGNAL BASE", image: "/assets/images/products/railway-castings/SIGNAL BASE-min.JPG" },
  //     { name: "TERMINAL BOX & COVER FOR CLS", image: "/assets/images/products/railway-castings/TERMINAL BOX & COVER FOR CLS-min.JPG" },
    
  //   // Add more products as needed
  // ];

  const [products,setAllProducts]=useState()

  function filterProducts(items){
    setAllProducts(items.filter(item=>item.typeofproduct==="Railway Castings"))
  }
  
  async function fetchingRailwayCastings(){
    try {
      const res = await FetchAllProducts()
      console.log("mui",res)
      filterProducts(res)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchingRailwayCastings()
  },[])

  return (
    <div className="min-h-[60vh] w-full sm:py-6 px-2 py-2 sm:px-6 bg-gray-100">
      {/* Section Title */}
      <div className="text-left lg:ml-14 mb-10">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#FD5D14] border-l-4 border-blue-700 pl-4 mb-6">
          Railway Castings
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
  );
}//hello

export default RailwayCastings;
