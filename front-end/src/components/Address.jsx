function Address() {
    return (
        <div className="max-w-7xl  mx-auto  mt-10 px-2 md:px-8 gap-8">
            <h1 className=" text-xl md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10">Address </h1>
            {/* office and factory */}
            <div className="flex flex-col  mx-auto md:flex-row gap-6 px-1 py-8">
                {/* Office */}
                <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden md:w-1/2">
                    {/* Image Section */}
                    <div className="w-full">
                      <img 
                        src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Office"
                        className="w-full h-48 object-cover"
                       />
                    </div>
                  
                    {/* Address Section */}
                    <div className="p-4 text-left">
                      <h2 className=" text-md md:text-lg flex items-center gap-3 font-semibold text-gray-800 mb-2">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                            <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
                          </svg>
                        </span>
                        Office
                      </h2>
                      
                      <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
                        SUITE-5, MAHAMAYA APARTMENTS<br></br>
                        58/1/1, NATABAR PAUL ROAD<br></br>
                        HOWRAH – 711101
                      </p>
                      <button className="bg-orangeColor text-white px-3 py-2 mt-4 rounded-md">
                        <a className="flex gap-1 items-center" href="https://maps.app.goo.gl/wKfDn1nsX4Px4uzt8">
                          <svg className="w-[24px] size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          
                          Find on map
                        </a>
                      </button>
                    </div>
                  </div>
                  
              
                {/* Factory */}
                <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden md:w-1/2">
                    {/* Image Section */}
                    <div className="w-full">
                      <img                       
                        src="https://cdn.pixabay.com/photo/2016/11/05/21/49/industry-1801661_960_720.jpg" 
                        alt="Office"
                        className="w-full h-48 object-cover"
                       />
                    </div>
                  
                    {/* Address Section */}
                    <div className="p-4 text-left">
                      <h2 className="text-md md:text-lg flex items-center gap-3 font-semibold text-gray-800 mb-2">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                            <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
                          </svg>
                        </span>
                        Factory
                      </h2>
                      <p className=" text-sm md:text-lg text-gray-600 leading-relaxed">
                        PLOT NOS. 42 & 43,  <br></br>
                        ULUBERIA INDUSTRIAL GROWTH CENTER
                        BIRSHIBPUR,<br></br>
                        HOWRAH - 711316
                      </p>
                      <button className="bg-orangeColor text-white px-3 py-2 mt-4 rounded-md">
                        <a className="flex gap-1 items-center" href="https://maps.app.goo.gl/wKfDn1nsX4Px4uzt8">
                          <svg className="w-[24px] size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                          </svg>
                          
                          Find on map
                        </a>
                      </button>
                    </div>
                  </div>
                  
              </div>
              
        </div>
    )
}

export default Address
