const express = require('express');
const { createCar } = require('../controllers/carController');

const router = express.Router();

router.post('/createCar', createCar);

module.exports = router;
