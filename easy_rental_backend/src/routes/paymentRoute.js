// routes/paymentRoutes.js
const express = require('express');
const { createPayment, getPaymentsByUser } = require('../controllers/paymentController');
const router = express.Router();

router.post('/createPayment', createPayment);
router.get('/user/:userId', getPaymentsByUser);

module.exports = router;
