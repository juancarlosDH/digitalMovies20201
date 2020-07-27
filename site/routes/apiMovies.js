const express = require('express');
const router = express.Router();
const path = require('path');

const controller = require('../controllers/api/movieController')

router.get('/random', controller.random);
router.get('/', controller.index);

router.get('/:id', controller.detail);


module.exports = router;
