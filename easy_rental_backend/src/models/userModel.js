const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  profileImage: {
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User= mongoose.model('User', userSchema);
module.exports = User;
