const express = require('express');
// const app = express();
const {createPayment} = require('../controllers/paymentController');

const router = express.Router();

router.post('/createPayment', createPayment);

module.exports = router;

//model, controller, route