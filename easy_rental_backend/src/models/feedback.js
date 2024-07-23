const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  }
});