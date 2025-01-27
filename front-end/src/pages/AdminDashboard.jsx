import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import HomeForm from "../forms/HomeForm";
import AboutForm from "../forms/AboutForm";
import ProductsForm from "../forms/ProductsForm";
import InfrastructureForm from "../forms/InfrastructureForm";
import QualityForm from "../forms/QualityForm";

function AdminDashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  function gotoHome() {
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-800 flex">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 p-4 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 fixed md:relative z-50 h-full`}
      >
        <div className="flex justify-between items-center mb-6">
          <div
            onClick={gotoHome}
            className="bg-white hover:cursor-pointer w-[90px] h-[50px] sm:w-[160px] sm:h-auto"
          >
            <img
              src="/assets/images/logo.png" // Adjusted for better path resolution
              className="w-full h-full"
              alt="Website Logo"
            />
          </div>
          <button
            className="text-white md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/home"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  location.pathname === "/admin/home" ? "bg-gray-700" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/about"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  location.pathname === "/admin/about" ? "bg-gray-700" : ""
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  location.pathname === "/admin/products" ? "bg-gray-700" : ""
                }`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/admin/infrastructure"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  location.pathname === "/admin/infrastructure" ? "bg-gray-700" : ""
                }`}
              >
                Infrastructure
              </Link>
            </li>
            <li>
              <Link
                to="/admin/quality"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  location.pathname === "/admin/quality" ? "bg-gray-700" : ""
                }`}
              >
                Quality
              </Link>
            </li>
            <li>
              <Link
                to="/admin/contact"
                className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                  location.pathname === "/admin/contact" ? "bg-gray-700" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4">
          <button
            className="flex items-center gap-2 py-2 px-4 w-full text-left rounded bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M18 12H8.25m9-3-3 3m0 0 3 3"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white flex justify-between items-center p-4 md:px-6">
          <button
            className="text-white md:hidden"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        </header>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6 bg-gray-100 min-h-screen">
          <Routes>
            {/* Redirect `/admin` to `/admin/home` */}
            <Route path="/" element={<Navigate to="/admin/home" />} />
            <Route path="/home" element={<HomeForm />} />
            <Route path="/about" element={<AboutForm />} />
            <Route path="/products" element={<ProductsForm />} />
            <Route path="/infrastructure" element={<InfrastructureForm />} />
            <Route path="/quality" element={<QualityForm />} />
            <Route path="/contact" element={<QualityForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
