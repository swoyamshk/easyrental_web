import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HeroSection = () => {
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [location, setLocation] = useState("san-francisco");

  return (
    <section className="bg-primary py-16 px-6 md:px-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary-foreground mb-4">
        Find Your Perfect Car
      </h1>
      <p className="text-lg text-primary-foreground mb-8">
        Rent the car you need, when you need it.
      </p>
      <form className="bg-primary-foreground rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date" className="text-sm font-medium">
              Pickup Date
            </label>
            <div className="relative">
              <DatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
                placeholderText="Select pickup date"
                dateFormat="MM/dd/yyyy"
                id="pickup-date"
                wrapperClassName="w-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date" className="text-sm font-medium">
              Return Date
            </label>
            <div className="relative">
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
                placeholderText="Select return date"
                dateFormat="MM/dd/yyyy"
                id="return-date"
                wrapperClassName="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm h-10"
          >
            <option value="san-francisco">San Francisco, CA</option>
            <option value="los-angeles">Los Angeles, CA</option>
            <option value="new-york">New York, NY</option>
            <option value="chicago">Chicago, IL</option>
          </select>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-cyan-900 text-slate-100 hover:bg-primary/90 rounded-md px-8 w-full h-12">
          Search
        </button>
      </form>
    </section>
  );
};

export default HeroSection;
