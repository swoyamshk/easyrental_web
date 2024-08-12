import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingForm = () => {
  const { state } = useLocation();
  const car = state?.car || {};
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve user ID

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category/getAllCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Match category ID to name
    const matchedCategory = categories.find(cat => cat._id === car.category);
    if (matchedCategory) {
      setCategoryName(matchedCategory.name);
    }
  }, [categories, car.category]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      toast.error('Start Date and End Date are required');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    // Reset time to 00:00:00 for comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (start < today || end < today) {
      toast.error('Dates cannot be in the past');
      return;
    }

    if (end <= start) {
      toast.error('End Date must be after Start Date');
      return;
    }

    const days = (end - start) / (1000 * 60 * 60 * 24);
    if (isNaN(days) || days <= 0) {
      toast.error('Invalid date range');
      return;
    }

    const totalCost = car.pricePerDay * days;
    console.log('Booking Data:', {
      user: userId,
      car: car._id,
      rentalStart: startDate,
      rentalEnd: endDate,
      pickupLocation,
      totalCost,
      status: 'reserved'
    });

    try {
      await axios.post('http://localhost:5000/api/rental/createRental', {
        user: userId,
        car: car._id,
        rentalStart: startDate,
        rentalEnd: endDate,
        pickupLocation, // Make sure this matches the backend field name
        totalCost,
        status: 'reserved'
      });
      

      navigate('/bookingconfirmation', {
        state: {
          car,
          rentalStart: startDate,
          rentalEnd: endDate,
          pickupLocation,
          totalCost
        }
      }); // Redirect to a success page
    } catch (error) {
      console.error(error);
      toast.error('Failed to book the car');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 md:py-16">
      <ToastContainer /> {/* Add ToastContainer for toast messages */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <img
            src={car.imageUrl || '/placeholder.svg'}
            alt={`${car.brand} ${car.model}`}
            width="800"
            height="500"
            className="w-full h-[400px] md:h-[400px] object-fit rounded-lg"
            style={{ aspectRatio: '1000 / 500', objectFit: 'fit' }}
          />
        </div>
        
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold">{car.year} {car.brand} {car.model}</h1>
            <p className="text-muted-foreground">{categoryName || 'Midsize Sedan'}</p>
            <p className="text-muted-foreground">{car.year}</p>
            <p className="text-muted-foreground">{car.doors || 4} doors, {car.seats || 5} seats</p>
          </div>
          <div className="prose">
            <p>
              {car.description || 'The 2023 Toyota Camry is a reliable and comfortable midsize sedan...'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold">Rental Price</h3>
              <p className="text-2xl font-bold">${car.pricePerDay} / day</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Availability</h3>
              <p className="text-2xl font-bold">{car.available ? "Yes" : "No" }</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                Book Your Rental
              </h3>
            </div>
            <div className="p-6">
              <form className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="start-date"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="start-date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="end-date"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      id="end-date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="pickup-location"
                  >
                    Pickup Location
                  </label>
                  <select
                    id="pickup-location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
                  >
                    <option value="kathmandu">Kathmandu, Nepal</option>
                    <option value="lalitpur">Lalitpur, Nepal</option>
                    <option value="bhaktapur">Bhaktapur, Nepal</option>
                    <option value="pokhara">Pokhara, Nepal</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleBooking}
                  className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-800"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
