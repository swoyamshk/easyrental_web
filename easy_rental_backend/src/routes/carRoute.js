const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Create a new car (POST /api/cars)
router.post('/createCar', carController.createCar);

// Get all cars (GET /api/cars)
router.get('/getCars', carController.getAllCars);

// Get a single car by ID (GET /api/cars/:id)
router.get('/getCars/:id', carController.getCarById);

// Update a car by ID (PUT /api/cars/:id)
router.put('/updateCars/:id', carController.updateCar);

// Delete a car by ID (DELETE /api/cars/:id)
router.delete('/deleteCars/:id', carController.deleteCar);

module.exports = router;
