const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Create a new rental (POST /api/rentals)
router.post('/createRental', rentalController.createRental);

// Get all rentals (GET /api/rentals)
router.get('/getRentals', rentalController.getAllRentals);

// Get a single rental by ID (GET /api/rentals/:id)
router.get('/getRentals/:id', rentalController.getRentalById);

// Update a rental by ID (PUT /api/rentals/:id)
router.put('/updateRentals/:id', rentalController.updateRental);

// Delete a rental by ID (DELETE /api/rentals/:id)
router.delete('/deleteRentals/:id', rentalController.deleteRental);

module.exports = router;
