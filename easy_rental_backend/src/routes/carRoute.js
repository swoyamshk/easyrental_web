const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Create a new car (POST /api/cars)
router.post('/cars', carController.createCar);

// Get all cars (GET /api/cars)
router.get('/cars', carController.getAllCars);

// Get a single car by ID (GET /api/cars/:id)
router.get('/cars/:id', carController.getCarById);

// Update a car by ID (PUT /api/cars/:id)
router.put('/cars/:id', carController.updateCar);

// Delete a car by ID (DELETE /api/cars/:id)
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
