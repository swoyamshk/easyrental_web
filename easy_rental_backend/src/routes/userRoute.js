const express = require('express');
// const app = express();
const {createUser} = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/createUser', createUser);
router.post('/loginUser', loginUser);

module.exports = router;

//model, controller, route