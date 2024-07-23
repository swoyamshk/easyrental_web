const express = require('express');
// const app = express();
const createFeedback = require('../controllers/feedbackController');

const router = express.Router();

router.post('/createFeedback', createFeedback);

module.exports = router;

//model, controller, route