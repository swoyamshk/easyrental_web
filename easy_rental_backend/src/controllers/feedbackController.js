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

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Get feedback by ID
const getFeedbackById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Update feedback by ID
const updateFeedbackById = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(id, { title, description }, { new: true, runValidators: true });
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback updated successfully", feedback });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

// Delete feedback by ID
const deleteFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById
};
