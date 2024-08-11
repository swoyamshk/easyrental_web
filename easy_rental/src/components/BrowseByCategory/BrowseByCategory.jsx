import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import CategoryCard from '../CategoryCard/CategoryCard';

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category/getAllCategories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate('/browse-cars', { state: { selectedCategory: categoryId } });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 px-6 md:px-10 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <a className="text-primary hover:underline" href="browse-cars">
            View All
          </a>
        </div>
        <div className="relative">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Slider {...settings}>
              {categories.map((category) => (
                <div key={category._id} className="p-4">
                  <div
                    className="transition-transform transform hover:scale-105 hover:shadow-lg"
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    <CategoryCard
                      imgSrc={category.imageUrl}
                      imgAlt={category.name}
                      title={category.name}
                      description={category.description}
                      className="h-[450px] max-h-[350px] flex flex-col" // Fixed height
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
