const Feedback = require('../models/feedback');

// Create a new feedback
const createFeedback = async (req, res) => {
  const { title, description } = req.body;
  const newFeedback = new Feedback({
    title,
    description,
  });

  try {
    const response = await newFeedback.save();
    res.status(201).json({ message: "Feedback created successfully", response });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};
module.exports = {
    createFeedback
  };