const Rental = require('../models/rentalModel');

// Create a new rental
const createRental = async (req, res) => {
  const { user, car, rentalStart, rentalEnd, totalCost, status } = req.body;
  const newRental = new Rental({
    user: user,
    car: car,
    rentalStart: rentalStart,
    rentalEnd: rentalEnd,
    totalCost: totalCost,
    status: status !== undefined ? status : 'reserved',
  });

  try {
    const response = await newRental.save();
    res.status(201).json({ message: "Rental created successfully", response });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
    createRental
  };