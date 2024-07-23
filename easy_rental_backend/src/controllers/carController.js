const Car = require('../models/car');

// Create a new car
const createCar = async (req, res) => {
  const { brand, model, year, pricePerDay, available } = req.body;
  const newCar = new Car({
    brand: brand,
    model: model,
    year: year,
    pricePerDay: pricePerDay,
    available: available !== undefined ? available : true,
  });

  try {
    const response = await newCar.save();
    res.status(201).json({ message: "Car created successfully", response });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  createCar
};
