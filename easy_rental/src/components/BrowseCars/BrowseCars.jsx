import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/car/getCars');
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCarClick = (car) => {
    navigate('/book', { state: { car } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Browse Cars</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cars.map((car, index) => (
          <div
            key={index}
            className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCarClick(car)}
          >
            <img
              src={car.imageUrl}
              alt={car.model}
              width="300"
              height="200"
              className="w-full h-48 object-cover"
              style={{ aspectRatio: '300 / 200', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{car.brand} {car.model}</h3>
              <p className="text-sm text-muted-foreground mb-2">{car.year}</p>
              <p className="text-lg font-bold">${car.pricePerDay}/day</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCars;
