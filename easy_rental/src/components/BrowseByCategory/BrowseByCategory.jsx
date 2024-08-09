import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CategoryCard from '../CategoryCard/CatergoryCard';

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/car/getCars'); // Assuming your API endpoint is `/api/cars`
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-12 px-6 md:px-10 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <a className="text-primary hover:underline" href="browse-cars">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              imgSrc={category.imageUrl} // Adjust according to your data structure
              imgAlt={category.brand}
              title={category.model}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
