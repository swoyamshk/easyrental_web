import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const BookingForm = () => {
  const { state } = useLocation();
  const car = state?.car || {};
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve user ID

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      console.error('Start Date and End Date are required');
      return;
    }
    
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    if (isNaN(days) || days <= 0) {
      console.error('Invalid date range');
      return;
    }
  
    const totalCost = car.pricePerDay * days;
    console.log('Booking Data:', {
      user: userId,
      car: car._id,
      rentalStart: startDate,
      rentalEnd: endDate,
      totalCost,
      status: 'reserved'
    });
  
    try {
      await axios.post('http://localhost:5000/api/rental/createRental', {
        user: userId,
        car: car._id,
        rentalStart: startDate,
        rentalEnd: endDate,
        totalCost,
        status: 'reserved'
      });
      
      navigate('/bookingconfirmation', { 
        state: { 
          car,
          rentalStart: startDate,
          rentalEnd: endDate,
          totalCost
        } 
      }); // Redirect to a success page
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:px-6 md:py-16">
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
            <p className="text-muted-foreground">{car.category || 'Midsize Sedan'}</p>
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
