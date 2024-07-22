const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    trim: true,
  },
  photoURL: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  provider: {
    type: String,
    default: 'local', // e.g., 'local', 'google', 'facebook'
  },
  // Additional custom fields can be added here
  // Example:
  // phoneNumber: {
  //   type: String,
  //   trim: true,
  // },
  // address: {
  //   type: String,
  //   trim: true,
  // },
});



module.exports = User;
