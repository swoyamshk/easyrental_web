import React from 'react';
import CarCard from '../CarCard/CarCard';

const CarCardContainer = ({ cars }) => {
  return (
    <div>
      {cars.map((car, index) => (
        <CarCard key={index} {...car} />
      ))}
    </div>
  );
};

export default CarCardContainer;
