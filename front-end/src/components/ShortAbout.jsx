import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FetchAboutus from "../services/AboutPage/FetchAboutHeading";


function ShortAbout() {
    const[data, setdata]=useState("")
    
    async function fetchabout()
    {
     try{
        const get=await FetchAboutus();
        console.log('get',get)
        setdata(get)
     }
     catch(error)
     {
        console.log('error',error)
     }
    }
    useEffect(()=>{
       fetchabout();
    },[])
    
    return (
        <div className="min-h-[50vh] w-[100vw] py-6 px-2 flex items-center justify-center bg-gray-100">

                <div className="max-w-7xl  mx-auto flex flex-col lg:flex-row justify-around items-center mt-10 px-2 md:px-8  md:gap-8">
                    {/* Text Section */}
                    <div className="max-w-[700px]  md:text-left">
                        <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">{data.header}</h1>
                        <ul className="space-y-2 text-left text-gray-700 text-sm md:text-md font-medium  leading-loose">
                            <li >▣ {data?.content}
                               <br></br>
                            </li>
                           
                            <button className="flex bg-[#FD5D14] p-1 sm:p-2 rounded-md text-white  ">
                                <Link to="/about" className="flex gap-2 items-center" >
                                <span>See more </span>
        
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>                      
                                </Link>
                            </button>
                       
                        </ul>
                        </div>
                    {/* Image Section */}
                    <div className="mt-6 max-w-[500px]">
                        <img className="rounded-lg  w-full" src="./assets/gifs/team-management-gif.gif" alt="Who we are" />
                    </div>
                </div>

            </div>
    )
}

export default ShortAbout