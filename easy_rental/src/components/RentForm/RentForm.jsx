import React, { useState, useEffect } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RentForm = () => {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    pricePerDay: '',
    description: '',
    image: null,
    category: '',
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/category/getAllCategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
        toast.error('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file)); // Set the image preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axiosInstance.post('/api/car/createCar', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Car created successfully');
      console.log('Car created successfully', response.data);
      setFormData({
        brand: '',
        model: '',
        year: '',
        mileage: '',
        pricePerDay: '',
        description: '',
        image: null,
        category: '',
      });
      setImagePreview(null); // Clear the image preview
    } catch (error) {
      console.error('Error creating car', error.response?.data || error.message);
      toast.error(`Error creating car: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-5xl mx-auto p-6 sm:p-8 md:p-10" style={{ height: '680px' }}>
      <ToastContainer />
      <div className="flex flex-col space-y-1.5">
        <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">List Your Car for Rent</h3>
        <p className="text-sm text-muted-foreground">Enter the details below to advertise your car for rent.</p>
      </div>
      <div className="p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="brand">Brand</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="brand"
                  placeholder="Toyota"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="model">Model</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="model"
                  placeholder="Camry"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="year">Year</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="year"
                  placeholder="2020"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="mileage">Mileage</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="mileage"
                  placeholder="50,000"
                  type="number"
                  value={formData.mileage}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="pricePerDay">Daily Rental Rate</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="pricePerDay"
                placeholder="$50"
                type="number"
                value={formData.pricePerDay}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="description">Description</label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="description"
                rows="5"
                placeholder="Describe your car..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="category">Category</label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <div className="flex items-center mt-2">
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-cyan-900 text-zinc-100 hover:bg-primary/90 h-10 px-4 py-2"
              >
                List Car for Rent
              </button>
            </div>
          </div>
            </div>
          </div>
          <div className="grid">
            <label className="text-sm font-medium" htmlFor="image">Car Image</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected Car"
                className="rounded-md border border-input"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            )}
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default RentForm;
