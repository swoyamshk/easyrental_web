import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carsResponse = await axios.get('http://localhost:5000/api/car/getCars');
        setCars(carsResponse.data);

        const categoriesResponse = await axios.get('http://localhost:5000/api/category/getAllCategories');
        setCategories(categoriesResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCarClick = (car) => {
    navigate('/book', { state: { car } });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter cars based on selected categories
  const filteredCars = cars.filter((car) =>
    selectedCategories.length === 0
      ? true
      : selectedCategories.includes(car.category)
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Browse Cars</h1>
          <p className="text-muted-foreground">Find the perfect car for you</p>
        </div>
        <div className="relative w-full md:w-auto">
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
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            className="flex h-10 w-full bg-background px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-4 py-2 rounded-md border border-muted focus:border-primary focus:ring-primary"
            placeholder="Search by location"
            type="text"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        <div className="grid gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Filters</h3>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="type"
                  >
                    Car Type
                  </label>
                  {categories.map((category) => (
                    <div key={category._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category._id}`}
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                      />
                      <label
                        className="ml-2 text-sm font-medium"
                        htmlFor={`category-${category._id}`}
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              onClick={() => handleCarClick(car)}
            >
              <a className="group relative block overflow-hidden rounded-lg">
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  width="400"
                  height="300"
                  className="h-48 w-full object-cover transition-all duration-300 group-hover:scale-105"
                  style={{ aspectRatio: '400 / 300', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 text-white  bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button className="inline-flex text-lg items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                    Select
                  </button>
                </div>
              </a>
              <div className="p-6 grid gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{car.brand} {car.model}</h3>
                    <p className="text-sm text-muted-foreground">{car.year}</p>
                  </div>
                  <div className="font-semibold">${car.pricePerDay}/day</div>
                </div>
                <div className="text-sm text-muted-foreground">{car.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCars;
