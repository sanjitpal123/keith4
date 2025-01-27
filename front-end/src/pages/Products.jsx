import { Link } from "react-router-dom"
import ProductsContainer from "../components/ProductsContainer"

function Products() {
    return (
        <div
      className="w-full min-h-screen flex flex-col  items-center pt-[120px] lg:pt-[150px] py-10 text-gray-800 bg-gray-50"
    >
      
      {/* Header */}
      <div className="text-left ml-4 sm:ml-16 self-start mb-10 animate-fadeIn">
        <h1 className=" text-xl  md:text-3xl font-bold border-l-4  border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">PRODUCTS</h1>
        <p className="sm:text-lg text-gray-600">
          Explore our wide range of high-quality products.
        </p>
      </div>

      {/* Products Grid */}
      <ProductsContainer></ProductsContainer>
      {/* enquiry now */}
      <div className="bg-[#FD5D14] p-3 sm:p-6 text-xs sm:text-lg rounded-xl fixed right-2 bottom-6 sm:right-6 text-white">
        <button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] sm:w-[25px] size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
            </svg>
            <Link to="/contact">
              Enquiry Now
            </Link>
           </button>
      </div>
    </div>
    )
}

export default Products
