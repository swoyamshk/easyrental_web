import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rental/getRentals", // Updated endpoint
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error(
          "Error fetching bookings:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/rental/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // Update the local state to reflect the change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        )
      );
    } catch (error) {
      console.error(
        "Error cancelling booking:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.car && booking.car.model
      ? booking.car.model.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Booking History</h1>
        <div className="flex items-center gap-2">
          <input
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
            placeholder="Search by car model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer">
                  Booking Date<span className="ml-1">↑</span>
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer">
                  Car Model
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer">
                  Rental Duration (days)
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer">
                  Total Cost
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground cursor-pointer">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-16"></th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {filteredBookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <td className="p-4 align-middle">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 align-middle">
                    {booking.car && booking.car.model
                      ? `${booking.car.brand} ${booking.car.model}`
                      : "Unknown Model"}
                  </td>
                  <td className="p-4 align-middle">
                    {(new Date(booking.rentalEnd) -
                      new Date(booking.rentalStart)) /
                      (1000 * 60 * 60 * 24)}{" "}
                    days
                  </td>
                  <td className="p-4 align-middle">{booking.totalCost}</td>
                  <td className="p-4 align-middle">
                    {capitalizeFirstLetter(booking.status || "Pending")}
                  </td>
                  <td className="p-4 align-middle">
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
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
                        className="w-5 h-5"
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <span className="sr-only">Cancel booking</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
