import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingConfirmation = () => {
  const { state } = useLocation();
  console.log('BookingConfirmation state:', state); // Add debugging here

  const car = state?.car || {};
  const rentalStart = state?.rentalStart || 'N/A';
  const rentalEnd = state?.rentalEnd || 'N/A';
  const totalCost = state?.totalCost || 'N/A';

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
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
            className="text-green-500 size-12"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
          <h1 className="text-3xl font-bold text-foreground">Booking Confirmed</h1>
          <p className="text-muted-foreground">Congratulations! Your car rental booking has been successfully confirmed.</p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
          <div className="p-6 grid gap-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">Car Model</div>
              <div>{car.brand} {car.model}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium">Rental Dates</div>
              <div>{rentalStart} - {rentalEnd}</div>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>
            <div className="flex items-center justify-between">
              <div className="font-medium">Total Cost</div>
              <div className="text-lg font-bold">${totalCost}</div>
            </div>
          </div>
          <div className="flex items-center p-6">
            <button className="bg-green-500 text-slate-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
              View Booking Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
