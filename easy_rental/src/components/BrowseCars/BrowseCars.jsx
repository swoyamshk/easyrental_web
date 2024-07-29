import React from 'react';
import teslaImage from "../assets/img/tesla.png";
import bmw from "../assets/img/bmw.png";
import mercedes from "../assets/img/mercedes.png";

const BrowseCars = () => {
  const cars = [
    { name: 'Toyota Camry', year: 2020, price: 50, img: teslaImage },
    { name: 'Honda Civic', year: 2018, price: 45, img: bmw},
    { name: 'Ford Mustang', year: 2021, price: 75, img: mercedes},
    { name: 'Chevrolet Silverado', year: 2019, price: 65, img: teslaImage },
    { name: 'Nissan Altima', year: 2020, price: 55, img: teslaImage },
    { name: 'BMW X5', year: 2021, price: 100, img: teslaImage} ,
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Browse Cars</h1>
        <div className="flex items-center gap-4">
          <input
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full max-w-md"
            placeholder="Search by make, model, or price"
            type="text"
            value=""
          />
          <span
            dir="ltr"
            data-orientation="horizontal"
            aria-disabled="false"
            className="relative flex touch-none select-none items-center w-full max-w-md"
            style={{ '--radix-slider-thumb-transform': 'translateX(-50%)' }}
          >
            <span
              data-orientation="horizontal"
              className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
            >
              <span data-orientation="horizontal" className="absolute h-full bg-primary" style={{ left: '0%' }}></span>
            </span>
            <span style={{ transform: 'var(--radix-slider-thumb-transform)', position: 'absolute', left: 'calc(0% + 0px)' }}>
              <span
                role="slider"
                aria-valuemin="0"
                aria-valuemax="500"
                aria-orientation="horizontal"
                data-orientation="horizontal"
                tabIndex="0"
                className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                data-radix-collection-item=""
                aria-valuenow="0,500"
              ></span>
            </span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car, index) => (
          <a
            key={index}
            className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            href="#"
            rel="ugc"
          >
            <img
              src={car.img}
              alt={car.name}
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: '300 / 200', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{car.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{car.year}</p>
              <p className="text-lg font-bold">${car.price}/day</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
