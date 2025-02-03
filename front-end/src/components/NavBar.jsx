import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function gotoHome() {
    navigate("./");
  }

  return (
    <nav>
      <header>
        {/* Navigation Header */}
        <div className="w-full h-[100px] fixed z-[20] flex items-center justify-between px-4 md:px-8 bg-gradient-to-r from-[#02245B] via-[#033178] to-[#02245B] shadow-[0_2px_15px_-3px_rgba(2,36,91,0.2)] backdrop-blur-sm">
          {/* Logo Section */}
          <div className="bg-white w-[90px] h-[50px] sm:w-[160px] sm:h-auto rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              onClick={gotoHome}
              src="/assets/images/logo.png"
              className="w-full h-full hover:cursor-pointer"
              alt="Website Logo"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex w-[80%] justify-end">
            <ul className="text-white flex gap-8 items-center text-[15px] font-medium tracking-wide">
              <li>
                <Link
                  to="/"
                  className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/infrastructure"
                  className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
                >
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  to="/quality"
                  className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
                >
                  Quality
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="bg-[#FD5D14] text-white px-4 py-2 rounded-md hover:bg-[#e54c0c] transition-all duration-300 hover:shadow-lg shadow-md"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex right-0 items-center">
            <div
              className={`container ${menuOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 200 200"
                className="hover:scale-105 transition-transform duration-300"
              >
                <g strokeWidth="6.5" strokeLinecap="round">
                  <path
                    d="M72 82.286h28.75"
                    fill="#FD5D14"
                    fillRule="evenodd"
                    stroke="#fff"
                  />
                  <path
                    d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                    fill="none"
                    stroke="#fff"
                  />
                  <path
                    d="M72 125.143h28.75"
                    fill="#FD5D14"
                    fillRule="evenodd"
                    stroke="#fff"
                  />
                  <path
                    d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                    fill="none"
                    stroke="#fff"
                  />
                  <path
                    d="M100.75 82.286h28.75"
                    fill="#FD5D14"
                    fillRule="evenodd"
                    stroke="#fff"
                  />
                  <path
                    d="M100.75 125.143h28.75"
                    fill="#FD5D14"
                    fillRule="evenodd"
                    stroke="#fff"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden z-[50] top-[100px] w-full min-h-[100vh] bg-gradient-to-b from-[#02245B] via-[#033178] to-[#02245B] fixed left-0 ${
            menuOpen ? "fade-in" : "hidden"
          }`}
        >
          <ul className="text-white flex flex-col items-center p-8 gap-6 text-xl sm:text-2xl font-medium">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/infrastructure"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
              >
                Infrastructure
              </Link>
            </li>
            <li>
              <Link
                to="/quality"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-all duration-300 hover:scale-105 inline-block"
              >
                Quality
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="bg-[#FD5D14] text-white px-6 py-2 rounded-md hover:bg-[#e54c0c] transition-all duration-300 hover:shadow-lg shadow-md"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;