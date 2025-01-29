import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchAllProducts from "../services/ProductPage/FetchAllProducts";

function ProductsContainer() {
  const [allproducts, setallproducts] = useState([]);
  const navigate = useNavigate();

  let allTypeOfProducts=[]
  let templateProducts=[]

  function gotoProduct(productType) {
    if(productType.toLowerCase().startsWith("agricultural"))
      navigate("agricultural-castings");
    else if(productType.toLowerCase().startsWith("munici"))
      navigate("municipal-public-utility-castings");
    else if(productType.toLowerCase().startsWith("miscellaneous"))
      navigate("miscellaneous-castings");
    else if(productType.toLowerCase().startsWith("railway"))
      navigate("railway-castings")
    
  }

  function filterTypeOfProducts(products) {
    products.forEach(item => {
      if (item.typeofproduct.toLowerCase().endsWith("castings") && !allTypeOfProducts.includes(item.typeofproduct)) {
        allTypeOfProducts.push(item.typeofproduct);
        templateProducts.push({typeofproduct:item.typeofproduct, image: item.image})
      }
    });
  }

  async function fetchProduct() {
    try {
      const get = await FetchAllProducts();
      console.log("getproducts", get);
      filterTypeOfProducts(get)
      // console.log("the",allTypeOfProducts)
      // console.log("all type of products",templateProducts)
      setallproducts(templateProducts)
      // setallproducts(get.getall);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-full py-10 px-4 ">
      <div className="max-w-7xl mx-auto">
      

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allproducts?.map((item) => (
            <div
              key={item.typeofproduct}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.typeofproduct}
                className="w-full h-56 object-contain"
              />

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-bold  text-xl text-[#02245B] ">
                  {item?.typeofproduct?.toUpperCase()}
                </h3>
                {/* <p className="text-gray-600 text-sm mt-2">
                  {item.description?.slice(0, 60)}...
                </p> */}
              </div>

              {/* Action Button */}
              <div
                onClick={()=>gotoProduct(item.typeofproduct)}
                className="w-12 h-12 bg-[#FD5D14] text-white flex justify-center items-center rounded-full absolute bottom-4 right-4 shadow-md cursor-pointer hover:bg-[#02245B] transition duration-300"
              >
                <i className="fa-solid fa-arrow-right text-lg"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}//hi

export default ProductsContainer;