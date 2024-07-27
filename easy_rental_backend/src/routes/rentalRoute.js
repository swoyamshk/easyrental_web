const express = require('express');
// const app = express();
const {createRental} = require('../controllers/rentalController');

const router = express.Router();

router.post('/createRental', createRental);

module.exports = router;

//model, controller, route