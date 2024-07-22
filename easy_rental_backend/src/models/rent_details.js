const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Rental schema
const rentalSchema = new Schema({
  amount: {
    type: String,
    required: true,
  },
  bookerId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  model: {
    type: String,
    required: true,
  },
  rentPeriod: {
    type: String,
    required: true,
  },
  seatings: {
    type: String,
    required: true,
  },
  selected_payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
});


module.exports = Rental;
