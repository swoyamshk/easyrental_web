const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Create a new rental (POST /api/rentals)
router.post('/rentals', rentalController.createRental);

// Get all rentals (GET /api/rentals)
router.get('/rentals', rentalController.getAllRentals);

// Get a single rental by ID (GET /api/rentals/:id)
router.get('/rentals/:id', rentalController.getRentalById);

// Update a rental by ID (PUT /api/rentals/:id)
router.put('/rentals/:id', rentalController.updateRental);

// Delete a rental by ID (DELETE /api/rentals/:id)
router.delete('/rentals/:id', rentalController.deleteRental);

module.exports = router;
