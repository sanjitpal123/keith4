import { useEffect, useState } from "react";
import FetchAllProducts from "../services/ProductPage/FetchAllProducts";

function MunicipalCastings() {
  // Example products data
  // const products = [
  //   { name: "HARD LINER PLATES OF 400+BHN", image: "/assets/images/products/municipal-castings/4 X 24 RING & GRATE-min.jpg" },
  //   { name: "8 X 24 TRENCH GRATE & FRAME", image: "/assets/images/products/municipal-castings/8 X 24 TRENCH GRATE & FRAME-min.jpg" },
  //   { name: "10 X 24 TRENCH GRATE & FRAME", image: "/assets/images/products/municipal-castings/10 X 24 TRENCH GRATE & FRAME-min.jpg" },
  //   { name: "12 X 24 TRENCH GRATE & FRAME", image: "/assets/images/products/municipal-castings/12 X 24 TRENCH GRATE & FRAME-min.jpg" },
  //   { name: "20 X 24 TRENCH GRATE & FRAME", image: "/assets/images/products/municipal-castings/20X 24 TRENCH GRATE & FRAME-min.jpg" },
  //   { name: "24 CO X 8 HIGH STRAIGHT WALLED RING & COVER - STORM DRAIN", image: "/assets/images/products/municipal-castings/24 CO X 8 HIGH STRAIGHT WALLED RING & COVER - STORM DRAIN-min.jpg" },
  //   { name: "24 CO X 8 HIGH STRAIGHT WALLED RING & COVER", image: "/assets/images/products/municipal-castings/24 CO X 8 HIGH STRAIGHT WALLED RING & COVER-min.jpg" },
  //   { name: "24 CO X 9 HIGH RING & COVER - STORM DRAIN", image: "/assets/images/products/municipal-castings/24 CO X 9 HIGH RING & COVER - STORM DRAIN-min.jpg" },
  //   { name: "24 RING & COVER - S", image: "/assets/images/products/municipal-castings/24 RING & COVER - S-min.jpg" },
  //   { name: "24 TURN LOCK RING & COVER - SEWER", image: "/assets/images/products/municipal-castings/24 TURN LOCK RING & COVER - SEWER-min.jpg" },
  //   { name: "24 X 24 FRAME & GRATE - MODIFIED VERSION", image: "/assets/images/products/municipal-castings/24 X 24 FRAME & GRATE - MODIFIED VERSION-min.jpg" },
  //   { name: "30 X 30 TYPE-A FRAME & GRATE", image: "/assets/images/products/municipal-castings/30 X 30 TYPE-A FRAME & GRATE-min.jpg" },
  //   { name: "30 X 30 TYPE-A FRAME & NARROW SLOT ANTI SKID TYPE GRATE", image: "/assets/images/products/municipal-castings/30 X 30 TYPE-A FRAME & NARROW SLOT ANTI SKID TYPE GRATE-min.jpg" },
  //   { name: "32 RING & COVER - SANITARY", image: "/assets/images/products/municipal-castings/32 RING & COVER -  SANITARY-min.jpg" },
  //   { name: "32 RING & COVER - STORM", image: "/assets/images/products/municipal-castings/32 RING & COVER -  STORM-min.jpg" },
  //   { name: "32 RING & COVER - STORM SEWER", image: "/assets/images/products/municipal-castings/32 RING & COVER - STORM SEWER-min.jpg" },
  //   { name: "200 X 200 SQUARE FRAME & ROUND COVER", image: "/assets/images/products/municipal-castings/200 X 200 SQUARE FRAME & ROUND COVER-min.jpg" },
  //   { name: "DRAIN TRAP BODY", image: "/assets/images/products/municipal-castings/DRAIN TRAP BODY-min.jpg" },
  //   { name: "R X 24 RING & COVER", image: "/assets/images/products/municipal-castings/R X 24 RING & COVER-min.jpg" },
  //   { name: "RING & COVER FOR GERMAN MARKET", image: "/assets/images/products/municipal-castings/RING & COVER FOR GERMAN MARKET-min.jpg" },
  //   { name: "WATER TIGHT RING & COVER", image: "/assets/images/products/municipal-castings/WATER TIGHT RING & COVER-min.jpg" },
  // ];
  
  const [products,setAllProducts]=useState()

  function filterProducts(items){
    setAllProducts(items.filter(item=>item.typeofproduct==="Municipal & Public Utility Castings"))
  }
  
  async function fetchingMunicipalCastings(){
    try {
      const res = await FetchAllProducts()
      console.log("mui",res)
      filterProducts(res)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchingMunicipalCastings()
  },[])

  return (
    <div className="min-h-[60vh] w-full sm:py-6 px-2 py-2 sm:px-6 bg-gray-100">
      {/* Section Title */}
      <div className="text-left lg:ml-14 mb-10">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#FD5D14] border-l-4 border-blue-700 pl-4 mb-6">
          Municipal Castings
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
}
//hi
export default MunicipalCastings;
