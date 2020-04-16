const express = require('express');
const router = express.Router();

const controller = require('../controllers/heroesController')

/* GET home page. */
router.get('/bio/:id/:ok?', controller.bio);


module.exports = router;
