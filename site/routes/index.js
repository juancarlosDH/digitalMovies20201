const express = require('express');
const router = express.Router();

const controller = require('../controllers/indexController')

/* GET home page. */
router.get('/', controller.index);

router.get('/faqs', controller.faqs);

router.get('/contact', controller.contact);

module.exports = router;