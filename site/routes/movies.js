const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check, checkSchema, validationResult, body} = require('express-validator')

//para subir la imagen, lo configuro aqui con multer
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public/img/movies');
    },
    filename : (req, file, cb) => {
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }, 
});

//ahora si lo uso, aqui mismo lo valido
const upload = multer({storage: storage, fileFilter(req, file, cb){
    console.log(file)
    //Validate the files as you wish, this is just an example
    if(file.mimetype === 'image/png') {
        return cb(null, true);
    }
    cb(null, false);
}});

const controller = require('../controllers/movieController')

router.get('/', controller.index);
//ruta para guardar los datos de la pelicula
//primero obtengo el poster que viene del formulario
router.post('/', upload.single('poster'), [
    check('title').isLength({min:2}),
    check('rating').isNumeric(),
    //falta validar que no sea una imagen y lanzar el error
], controller.create); 

router.get('/create', controller.formCreate); 
// --/movies/create

router.get('/:id', controller.detail);
// --/movies/12

router.put('/:id', controller.edit);

router.delete('/:id', controller.delete);

router.get('/:id/edit', controller.formEdit);
// --/movies/12/edit

module.exports = router;
