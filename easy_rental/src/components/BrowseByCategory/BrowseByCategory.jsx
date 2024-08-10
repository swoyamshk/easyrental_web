import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import CategoryCard from '../CategoryCard/CategoryCard'; // Corrected import path

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 cards at a time
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
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
                  <div className="transition-transform transform hover:scale-105 hover:shadow-lg">
                    <CategoryCard
                      imgSrc={category.imageUrl} // Adjust according to your data structure
                      imgAlt={category.name} // Assuming `name` is a better descriptor for the alt tag
                      title={category.name} // Adjust based on your data
                      description={category.description}
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
