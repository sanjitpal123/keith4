import { useEffect, useState } from "react";
import FetchAboutHeading from "../services/AboutPage/FetchAboutHeading";

function ContactForm() {
    
    return (
        <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
          {/* Form container */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold  p-4 bg-gray-800 text-white">
              Contact Us
            </h2>
            <form className="space-y-6 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Place Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter value"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Place name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter value"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Input Field 3
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter value"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Textarea 1
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Write something..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Textarea 2
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Write something..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Image/Video 1
                  </label>
                  <input
                    type="file"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Image/Video 2
                  </label>
                  <input
                    type="file"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="sm:w-[120px] px-3 py-2 bg-blue-600 text-white sm:py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
    )
}

export default ContactForm
