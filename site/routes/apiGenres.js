const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require('../controllers/api/genreController')

router.get('/', controller.index);

module.exports = router;
