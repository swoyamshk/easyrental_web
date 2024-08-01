const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment (POST /api/payments)
router.post('/payments', paymentController.createPayment);

// Get all payments (GET /api/payments)
router.get('/payments', paymentController.getAllPayments);

// Get a single payment by ID (GET /api/payments/:id)
router.get('/payments/:id', paymentController.getPaymentById);

// Update a payment by ID (PUT /api/payments/:id)
router.put('/payments/:id', paymentController.updatePayment);

// Delete a payment by ID (DELETE /api/payments/:id)
router.delete('/payments/:id', paymentController.deletePayment);

module.exports = router;
