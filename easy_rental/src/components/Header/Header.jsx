import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="bg-primary text-primary-foreground py-4 px-6 md:px-10 flex items-center justify-between">
    <Link className="text-2xl font-bold" to="/">
      Easy Rental
    </Link>
    <nav className="hidden md:flex items-center gap-6">
      <Link className="hover:underline" to="/">
        Home
      </Link>
      <Link className="hover:underline" to="/browse-cars">
        Browse Cars
      </Link>
      <Link className="hover:underline" to="rent">
        Rent a Car
      </Link>
      <Link className="hover:underline" to="/contact">
        Contact
      </Link>
      <Link className="hover:underline" to="/login">
        Login
      </Link>
      <Link className="hover:underline" to="/signup">
        SignUp
      </Link>
    </nav>
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <line x1="4" x2="20" y1="12" y2="12"></line>
        <line x1="4" x2="20" y1="6" y2="6"></line>
        <line x1="4" x2="20" y1="18" y2="18"></line>
      </svg>
    </button>
  </header>
);

export default Navbar;
