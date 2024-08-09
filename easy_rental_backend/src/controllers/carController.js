const Car = require('../models/carModel');





const createCar = async (req, res) => {
  const { brand, model, year, pricePerDay, available, description } = req.body;
  const imageUrl = req.file ? `http://localhost:5000/uploads/car/${req.file.filename}` : null; // Store the file path

  const newCar = new Car({
    brand,
    model,
    year,
    pricePerDay,
    available: available !== undefined ? available : true,
    description,
    imageUrl,
  });

  try {
    const response = await newCar.save();
    res.status(201).json({ message: 'Car created successfully', response });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', err });
  }
};


// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Get a single car by ID
const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Update a car by ID
const updateCar = async (req, res) => {
  const { id } = req.params;
  const { brand, model, year, pricePerDay, available } = req.body;
  try {
    const updatedCar = await Car.findByIdAndUpdate(id, { brand, model, year, pricePerDay, available }, { new: true });
    if (!updatedCar) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car updated successfully", updatedCar });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Delete a car by ID
const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
