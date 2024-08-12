const Rental = require('../models/rentalModel');

// Create a new rental
const createRental = async (req, res) => {
  const { user, car, rentalStart, rentalEnd, totalCost, status, pickupLocation } = req.body;

  // Validate input data
  if (!user || !car || !rentalStart || !rentalEnd || !totalCost || !pickupLocation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRental = new Rental({
    user,
    car,
    rentalStart,
    rentalEnd,
    totalCost,
    status: status || 'reserved',
    pickupLocation // Update this line to use pickupLocation
  });

  try {
    const savedRental = await newRental.save();
    res.status(201).json({ message: "Rental created successfully", savedRental });
  } catch (err) {
    console.error('Error creating rental:', err);
    res.status(500).json({ message: "Internal server error", err });
  }
};


// Get all rentals
const getAllRentals = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authentication middleware

    // Find rentals where the 'user' field matches the logged-in user's ID
    const rentals = await Rental.find({ user: userId }).populate('user').populate('car');

    res.status(200).json(rentals);
  } catch (err) {
    console.error("Error fetching rentals:", err);
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

const cancelRental = async (req, res) => {
  const { id } = req.params; // Assuming you use the rental ID, not booking ID

  try {
    // Find the rental by ID
    const rental = await Rental.findById(id);

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    // Check if the rental is already cancelled
    if (rental.status === 'cancelled') {
      return res.status(400).json({ message: 'Rental is already cancelled' });
    }

    // Update the status to 'cancelled'
    rental.status = 'cancelled';
    await rental.save();

    res.status(200).json({ message: 'Rental cancelled successfully', rental });
  } catch (error) {
    console.error('Error cancelling rental:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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
  cancelRental
};
