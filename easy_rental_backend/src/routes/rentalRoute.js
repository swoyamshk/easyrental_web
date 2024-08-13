const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const auth = require("../middleware/authMiddleware");

// Create a new rental (POST /api/rentals)
router.post('/createRental', rentalController.createRental);
router.get('/total', rentalController.getTotalRentals);
// Get all rentals (GET /api/rentals)
router.get('/getRentals', auth, rentalController.getAllRentals);
router.get('/activities', rentalController.getRecentActivities);
// Get a single rental by ID (GET /api/rentals/:id)
router.get('/getRentals/:id', rentalController.getRentalById);

// Update a rental by ID (PUT /api/rentals/:id)
router.put('/updateRentals/:id', rentalController.updateRental);

// Delete a rental by ID (DELETE /api/rentals/:id)
router.delete('/deleteRentals/:id', rentalController.deleteRental);

router.put('/cancel/:id', rentalController.cancelRental);
router.get('/revenue', rentalController.getTotalRevenue);
module.exports = router;
