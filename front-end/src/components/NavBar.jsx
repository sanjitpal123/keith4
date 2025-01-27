import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <header>
        {/* Navigation Header */}
        <div className="w-full h-[100px] fixed z-[20] flex items-center justify-between px-4 md:px-8 bg-[#02245B]">
          {/* Logo Section */}
          <div className="bg-white w-[90px] h-[50px] sm:w-[160px] sm:h-auto">
            <img src="./assets/images/logo.png" className="w-full h-full" alt="Website Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex w-[80%] justify-end">
            <ul className="text-white flex gap-6 items-center text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-[#FD5D14] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-[#FD5D14] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-[#FD5D14] transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/infrastructure"
                  className="hover:text-[#FD5D14] transition-colors"
                >
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link
                  to="/quality"
                  className="hover:text-[#FD5D14] transition-colors"
                >
                  Quality
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#FD5D14] transition-colors"
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
              >
                <g strokeWidth="6.5" strokeLinecap="round">
                  <path
                    d="M72 82.286h28.75"
                    fill="#009100"
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
                    fill="#009100"
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
                    fill="#009100"
                    fillRule="evenodd"
                    stroke="#fff"
                  />
                  <path
                    d="M100.75 125.143h28.75"
                    fill="#009100"
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
          className={`md:hidden z-[50] top-[100px] w-full min-h-[100vh] bg-[#02245B] fixed left-0 ${
            menuOpen ? "fade-in" : "hidden"
          }`}
        >
          <ul className="text-white flex flex-col items-center p-4 gap-4 text-xl sm:text-3xl font-medium">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/infrastructure"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-colors"
              >
                Infrastructure
              </Link>
            </li>
            <li>
              <Link
                to="/quality"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-colors"
              >
                Quality
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="hover:text-[#FD5D14] transition-colors"
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
