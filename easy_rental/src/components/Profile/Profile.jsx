import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi"; // Import pencil icon
import profileImg from "../assets/img/profileImg.png"
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [rentals, setRentals] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    imageUrl: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setUser(response.data);
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          phone: response.data.phone || "",
          bio: response.data.bio || "",
          imageUrl: response.data.profileImage || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();

    const fetchRentalHistory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rental/getRentals", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setRentals(response.data);
      } catch (error) {
        console.error("Error fetching rental history:", error);
      }
    };

    fetchRentalHistory();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formPayload = new FormData();
    formPayload.append("firstName", formData.firstName);
    formPayload.append("lastName", formData.lastName);
    formPayload.append("phone", formData.phone);
    formPayload.append("bio", formData.bio);
  
    if (selectedFile) {
      formPayload.append("image", selectedFile);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/updateUser/${user._id}`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      
      // Update the user state with the new data
      const updatedUser = response.data.user;
      setUser(updatedUser);
      setFormData((prev) => ({
        ...prev,
        imageUrl: updatedUser.profileImage, // Update the imageUrl with the new URL
      }));
  
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleRedirect = () => {

    navigate("/history"); 
  };
  
  
  

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex flex-col items-center">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 sm:w-32 sm:h-32">
            <img
              className="aspect-square h-full w-full"
              alt="User Avatar"
              src={user.imageUrl || profileImg}
            />
            <label
              htmlFor="imageUpload"
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer bg-black bg-opacity-50"
            >
              <FiEdit2 className="text-white w-6 h-6" />
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </span>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Profile</h1>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border h-[1px] w-full my-6"
          ></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Rental History</h3>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="p-6">
                  <div className="grid gap-4">
                    {rentals.length > 0 ? (
                      rentals.map((rental) => (
                        <div
                          key={rental._id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <h4 className="font-medium">{rental.car.model}</h4>
                            <p className="text-muted-foreground">
                              Rented on:{" "}
                              {new Date(rental.rentalStart).toLocaleDateString()}
                            </p>
                          </div>
                          <button onClick={handleRedirect} className="inline-flex ml-3 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                            View Details
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No rentals found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
              <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
                data-v0-t="card"
              >
                <div className="p-6">
                  <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="bio"
                      >
                        Bio
                      </label>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        id="bio"
                        value={formData.bio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
