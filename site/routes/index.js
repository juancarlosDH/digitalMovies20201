const express = require('express');
const router = express.Router();
//me traigo muylter para trabajar con subida de archivos
const multer = require('multer');
const path = require('path');

//configuro donde y como se van a llamar los archivos
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        const folder = 'public/img/users/avatars';
        //ojo debe de estar creada la carpeta en public
        cb(null, folder);
    },
    filename : (req, file, cb) => {
        //el nombre del archivo es interesante ya que debe ser un nombre unico y no reemplaze a otros archivos.
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }, 
});
const upload = multer({storage: storage});

const controller = require('../controllers/indexController')

/* GET home page. */
router.get('/', controller.index);

router.get('/faqs', controller.faqs);

router.get('/contact', controller.contact);

router.get('/login', controller.login);

router.get('/register', controller.register);
//uso el upload como segundo parametro de la ruta, asi suba primero la imagen y luego vaya al controlador
//uso el metodo .single y le paso el nombre del imput file para trabajar solo con ese archivo
router.post('/register', upload.single('avatar'), controller.registerUser);

module.exports = router;
