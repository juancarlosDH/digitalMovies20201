const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/img/movies');
    },
    filename : (req, file, cb) => {
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }, 
});
const upload = multer({storage: storage});

const controller = require('../controllers/movieController')

router.get('/', controller.index);   

router.get('/new', controller.formCreate); 
router.post('/new', upload.any(), controller.create); 

router.get('/detail/:id', controller.detail);

router.get('/edit/:id', controller.formEdit);
router.put('/edit/:id', controller.edit);

router.delete('/delete/:id', controller.delete);

module.exports = router;
