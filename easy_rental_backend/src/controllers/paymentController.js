// controllers/paymentController.js
const Payment = require('../models/paymentModel');

exports.createPayment = async (req, res) => {
  try {
    const { userId, cardNumber, cardName, cardExpiry, cardCVC, amount } = req.body;

    // Validate required fields
    if (!userId || !cardNumber || !cardName || !cardExpiry || !cardCVC || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const payment = new Payment({
      userId,
      cardNumber,
      cardName,
      cardExpiry,
      cardCVC,
      amount,
    });

    await payment.save();

    res.status(201).json({ message: 'Payment successful', payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPaymentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const payments = await Payment.find({ userId }).populate('carId');

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
