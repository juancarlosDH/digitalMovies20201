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
router.post('/', upload.any(), controller.create); 

router.get('/create', controller.formCreate); 
// --/movies/create

router.get('/:id', controller.detail);
// --/movies/12

router.put('/:id', controller.edit);

router.delete('/:id', controller.delete);

router.get('/:id/edit', controller.formEdit);
// --/movies/12/edit

module.exports = router;
