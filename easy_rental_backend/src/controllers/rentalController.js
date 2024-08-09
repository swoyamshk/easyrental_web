const Rental = require('../models/rentalModel');

// Create a new rental
const createRental = async (req, res) => {
  const { user, car, rentalStart, rentalEnd, totalCost, status } = req.body;

  console.log('Received rental data:', req.body); // Log the received data

  // Validate input data
  if (!user || !car || !rentalStart || !rentalEnd || !totalCost) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRental = new Rental({
    user,
    car,
    rentalStart,
    rentalEnd,
    totalCost,
    status: status || 'reserved',
  });

  try {
    const savedRental = await newRental.save();
    res.status(201).json({ message: "Rental created successfully", savedRental });
  } catch (err) {
    console.error('Error creating rental:', err); // Log error for debugging
    res.status(500).json({ message: "Internal server error", err });
  }
};


// Get all rentals
const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().populate('user').populate('car');
    res.status(200).json(rentals);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Get a single rental by ID
const getRentalById = async (req, res) => {
  const { id } = req.params;
  try {
    const rental = await Rental.findById(id).populate('user').populate('car');
    if (!rental) return res.status(404).json({ message: "Rental not found" });
    res.status(200).json(rental);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Update a rental by ID
const updateRental = async (req, res) => {
  const { id } = req.params;
  const { user, car, rentalStart, rentalEnd, totalCost, status } = req.body;

  try {
    const updatedRental = await Rental.findByIdAndUpdate(
      id,
      { user, car, rentalStart, rentalEnd, totalCost, status },
      { new: true }
    ).populate('user').populate('car');

    if (!updatedRental) return res.status(404).json({ message: "Rental not found" });
    res.status(200).json({ message: "Rental updated successfully", updatedRental });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Delete a rental by ID
const deleteRental = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRental = await Rental.findByIdAndDelete(id);
    if (!deletedRental) return res.status(404).json({ message: "Rental not found" });
    res.status(200).json({ message: "Rental deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental,
};
