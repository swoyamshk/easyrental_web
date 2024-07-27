const Payment = require('../models/paymentModel');

// Create a new payment
const createPayment = async (req, res) => {
  const { rental, amount, paymentMethod } = req.body;
  const newPayment = new Payment({
    rental: rental,
    amount: amount,
    paymentMethod: paymentMethod,
  });

  try {
    const response = await newPayment.save();
    res.status(201).json({ message: "Payment created successfully", response });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
    createPayment
  };