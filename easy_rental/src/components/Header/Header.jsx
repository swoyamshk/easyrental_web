import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImg from "../assets/img/profileImg.png";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({ imageUrl: "" });

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Check the user's role from localStorage
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch the user data from the backend using the provided /getUser/ route
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/user/me",
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          setUser(response.data);
          setFormData({
            imageUrl: response.data.profileImage || "",
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [isLoggedIn]);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); // Redirect to homepage or any other page after logout
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
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
        <Link className="hover:underline" to="/feedback">
          Feedback
        </Link>

        {isLoggedIn && (
          <>
            <Link className="hover:underline" to="/history">
              History
            </Link>
            {userRole === "admin" && (
              <>
                <Link className="hover:underline" to="/rent">
                  Rent a Car
                </Link>
                <Link className="hover:underline" to="/category">
                  Create Category
                </Link>
              </>
            )}
            <div className="relative">
              <img
                src={user?.imageUrl || profileImg} // Fallback to a default image
                alt="Profile"
                className="h-10 w-10 rounded-full cursor-pointer object-cover"
                onClick={toggleDropdown}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    to="/profile"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link className="hover:underline" to="/login">
              Login
            </Link>
            <Link className="hover:underline" to="/signup">
              Sign Up
            </Link>
          </>
        )}
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
};

export default Navbar;
