const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById
} = require('../controllers/feedbackController');

// Create a new feedback
router.post('/createFeedback', createFeedback);

// Get all feedbacks
router.get('/getFeedback', getAllFeedbacks);

// Get feedback by ID
router.get('/getFeedback/:id', getFeedbackById);

// Update feedback by ID
router.put('/updateFeedback/:id', updateFeedbackById);

// Delete feedback by ID
router.delete('/deleteFeedback/:id', deleteFeedbackById);

module.exports = router;
