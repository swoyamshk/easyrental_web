const express = require('express');
// const app = express();
const {createUser} = require('../controllers/userController');

const router = express.Router();

router.post('/createUser', createUser);

module.exports = router;

//model, controller, route