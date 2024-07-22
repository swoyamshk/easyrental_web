import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import navbarlogo from '../../assets/img/navlogo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
          <img src={navbarlogo} alt="Easy Rental Logo" className="h-8 w-8 mr-2" />
          <span className="font-semibold text-xl tracking-tight">Easy Rental</span>
        </div>
        {/* Mobile menu button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-400 hover:text-black hover:border-black"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          </button>
        </div>
        {/* Nav Items */}
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="lg:flex lg:flex-grow lg:justify-end">
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-4">
              Home
            </Link>
            <Link to="/services" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-4">
              Services
            </Link>
            <Link to="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-4">
              Contact Us
            </Link>
            <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-4">
              About Us
            </Link>
            <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-4">
              Login
            </Link>
            <Link to="/register" className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
