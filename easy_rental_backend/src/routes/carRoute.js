const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizationMiddleware");
const multer = require('multer');
const path = require('path');

const carController = require('../controllers/carController');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/car'); // Specify the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    },
  });
  const upload = multer({ storage });

// Create a new car (POST /api/cars)
router.post('/createCar',auth, authorizeRole('admin'),upload.single('image'), carController.createCar);

// Get all cars (GET /api/cars)
router.get('/getCars', carController.getAllCars);

// Get a single car by ID (GET /api/cars/:id)
router.get('/getCars/:id', carController.getCarById);

// Update a car by ID (PUT /api/cars/:id)
router.put('/updateCars/:id', carController.updateCar);

// Delete a car by ID (DELETE /api/cars/:id)
router.delete('/deleteCars/:id', carController.deleteCar);

module.exports = router;
