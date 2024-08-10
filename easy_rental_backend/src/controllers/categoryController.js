const Category = require('../models/categoryModel');

// Create a new category
const createCategory = async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const { name, description } = req.body;
  const imageUrl = req.file ? `http://localhost:5000/uploads/category/${req.file.filename}` : null;   
  if (!name) return res.status(400).json({ message: 'Name is required' });
  
  const newCategory = new Category({
    name,
    description,
    imageUrl
  });
  
  try {
    const response = await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', response });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};


// Get a single category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id).populate('cars');
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updateData = {
    name,
    description
  };

  if (req.file) {
    updateData.imageUrl = `http://localhost:5000/uploads/category/${req.file.filename}`; // Update image URL
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category updated successfully', updatedCategory });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
