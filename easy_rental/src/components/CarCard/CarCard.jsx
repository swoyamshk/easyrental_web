import React from 'react';

const CarCard = ({ 
  image, 
  name, 
  rating, 
  passengers, 
  driverOption, 
  transmission, 
  airConditioning, 
  fuelPolicy, 
  meetAndGreet 
}) => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-300 p-4 m-4 rounded-lg shadow-lg bg-white w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      <img src={image} alt={name} className="w-full sm:w-48 h-auto mb-4 sm:mb-0 sm:mr-4 object-fit" />
      <div className="flex flex-col w-full">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">{name}</h2>
        <div className="flex mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
          ))}
        </div>
        <div className="flex flex-col pb-3">
          <span>{passengers} passengers</span>
          <span>{driverOption ? 'With Driver' : 'Without Driver'}</span>
          <span>{transmission ? 'Manual Transmission' : 'Automatic Transmission'}</span>
        </div>
        <div className="flex flex-col">
          <ul className="list-none p-0">
            <li className={`flex items-center mb-1 ${airConditioning ? 'text-green-500' : 'text-red-500'}`}>
              {airConditioning ? '✔' : '✘'} Air Conditioning
            </li>
            <li className={`flex items-center mb-1 ${fuelPolicy ? 'text-green-500' : 'text-red-500'}`}>
              {fuelPolicy ? '✔' : '✘'} Fuel Policy
            </li>
            <li className={`flex items-center mb-1 ${meetAndGreet ? 'text-green-500' : 'text-red-500'}`}>
              {meetAndGreet ? '✔' : '✘'} Meet and Greet
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
