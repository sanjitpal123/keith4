
import { useEffect, useState } from "react"
import FetchContact from "../services/Contact/fetchcontact"
import PlaceAddress from "./PlaceAddress"
function Address() {
  const [address,setAddress]=useState([])
  async function fetchingAddress(){

    try {
      const res = await FetchContact()
      console.log("address",res)
      setAddress(res)
      
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    fetchingAddress()
    console.log("printing",address)
  },[])
    return (
        <div className="max-w-7xl  mx-auto  mt-10 px-2 md:px-8 gap-8">
            <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">Address </h1>
            {/* office and factory */}
            <div className="flex flex-col  mx-auto md:flex-row gap-6 px-1 py-8">
                {/* Office */}
                
                {address?.map((item) => (
                    <PlaceAddress key={item._id} address={item} />
                  ))}
                {/* Factory */}
                
                  
              </div>
              
        </div>
    )

}

export default Address;