import React, { useState } from 'react';
import axios from 'axios';

function CategoryForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    axios.post('http://localhost:5000/api/category/createCategory', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        onSuccess(); // Notify parent component of success
        setName('');
        setDescription('');
        setImage(null);
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
            Create New Category
          </h3>
          <p className="text-sm text-muted-foreground">
            Add a new category for your car rental business.
          </p>
        </div>
        <div className="p-6">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Category Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="description"
                rows="4"
                placeholder="Describe the category"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
                accept="image/*"
                onChange={handleImageChange}
              />
              {image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Category preview"
                    className="w-full h-auto max-h-40 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="items-center p-6 flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={() => {
                  setName('');
                  setDescription('');
                  setImage(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CategoryForm;
