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
  role:{
    type: String,
    enum:["Admin","Customer","Renter"],
    default: "Customer"
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
 
});


const User= mongoose.model('User', userSchema);
module.exports = User;
