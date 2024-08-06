const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

// CRUD routes
router.get('/getPayment', PaymentController.getAllPayments);
router.get('/getPayment/:id', PaymentController.getPaymentById);
router.post('/createPayment', PaymentController.createPayment);
router.put('/updatePayment/:id', PaymentController.updatePayment);
router.delete('/deletPayment/:id', PaymentController.deletePayment);

module.exports = router;
