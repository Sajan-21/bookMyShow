const express = require('express');
const app = express();
const router = express.Router();
const controller = require('../controller/moviesController');

router.post('/submit',controller.addMovie);

module.exports = router;