import React, { useState } from 'react';

const RentForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    dailyRate: '',
    description: '',
    photos: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      photos: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-4xl mx-auto p-6 sm:p-8 md:p-10"
      style={{ height: '620px' }} // Adjust height to accommodate the image preview
    >
      <div className="flex flex-col space-y-1.5">
        <h3 className="whitespace-nowrap tracking-tight text-3xl font-bold">List Your Car for Rent</h3>
        <p className="text-sm text-muted-foreground">Enter the details below to advertise your car for rent.</p>
      </div>
      <div className="p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="make">Make</label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="make"
                  placeholder="Toyota"
                  value={formData.make}
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
              <label className="text-sm font-medium" htmlFor="dailyRate">Daily Rental Rate</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="dailyRate"
                placeholder="$50"
                type="number"
                value={formData.dailyRate}
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
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="photos">Upload Photos</label>
              <div className="grid gap-4 h-1/2 w-1/2">
              {formData.photos.length > 0 && (
                <div className="grid gap-4">
                  {formData.photos.map((file, index) => (
                    <div key={index} className="grid gap-2">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="h-32 w-32 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="photos"
                multiple
                type="file"
                onChange={handleFileChange}
              />
            </div>
            
          </div>
          <div className="flex items-center">
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-cyan-900 text-zinc-100 hover:bg-primary/90 h-10 px-4 py-2"
              >
                List Car for Rent
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentForm;
