const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/category'); // Specify the destination folder for uploaded images
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    },
  });
  const upload = multer({ storage });

// Route to create a new category
router.post('/createCategory', upload.single('image'), (req, res) => {
    console.log(req.file); // This should log the uploaded file
    console.log(req.body); // This should log the other form data
    categoryController.createCategory(req, res);
});
// Route to get all categories
router.get('/getAllCategories', categoryController.getAllCategories);

// Route to get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Route to update a category by ID
router.put('/updateCategory/:id', categoryController.updateCategory);

// Route to delete a category by ID
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = router;
