const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bcryptjs = require('bcrypt');

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb (null, 'public/users');
  },
  filename : (req, file, cb) => {
    const nombre = req.body.nombre + '-' + Date.now() + path.extname(file.originalname);
    cb(null, nombre )
  }
});

const upload = multer({storage : storage});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/test', function(req, res, next) {
  res.render('tests/form');
});

router.post('/test', upload.any(), function(req, res, next) {
  console.log(req.files)
  console.log(bcryptjs.hashSync(req.body.nombre, 1))
  console.log(bcryptjs.hashSync(req.body.nombre, 10))
  res.send('Se subio el archivo');
});

module.exports = router;
