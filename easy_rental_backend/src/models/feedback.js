const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
