const express = require('express');
const router = express.Router();
//me traigo muylter para trabajar con subida de archivos
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/indexController')

/* GET home page. */
router.get('/', controller.index);

router.get('/faqs', controller.faqs);

router.get('/contact', controller.contact);

module.exports = router;
