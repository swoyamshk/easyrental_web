import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../CarCard/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/car/getCars');
        const data = await response.json();
        setCars(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCardClick = (car) => {
    navigate('/book', { state: { car } });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    focusOnSelect: false,
    initialSlide: 0,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Cars</h2>
          <a className="text-primary hover:underline" href="browse-cars">
            View All
          </a>
        </div>
        <div className="relative">
          <Slider {...settings} className="mb-6">
            {cars.map(car => (
              <div key={car._id} className="px-4">
                <Card
                  imgSrc={car.imageUrl}
                  imgAlt={car.model}
                  title={`${car.brand} ${car.model}`}
                  price={`$${car.pricePerDay}/day`}
                  onClick={() => handleCardClick(car)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
