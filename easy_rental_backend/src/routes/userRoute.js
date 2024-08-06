const express = require('express');
// const app = express();
const {
    createUser,
    loginUser,
    getUserbyId,
    updateUser,
    deleteUser,
    getUser
  } = require('../controllers/userController');

const router = express.Router();

router.post('/createUser', createUser);
router.post('/loginUser', loginUser);

router.get('/getUser/', getUser);
// GET /api/users/:id - Get a user by ID
router.get('/getUser/:id', getUserbyId);

// PUT /api/users/:id - Update a user by ID
router.put('/updateUser/:id', updateUser);

// DELETE /api/users/:id - Delete a user by ID
router.delete('/deleteUser/:id', deleteUser);

module.exports = router;

//model, controller, route