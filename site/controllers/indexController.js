// recuerden instalar con npm: nm install bcrypjs --save
const bcryptjs = require('bcryptjs');

const {check, validationResult, body} = require('express-validator')

module.exports = {
    index : function(req, res, next) {

        //pasar a json este array feo
        let pelis = [
            { 'title' : 'Guardianes de la Galaxia', 'id' : 1, 'poster' : '/img/movies/guardianesdelagalaxia.jpg'},
            { 'title' : 'Avengers', 'id' : 2, 'poster' : '/img/movies/avengers.jpg'},
            { 'title' : 'StarWars', 'id' : 3, 'poster' : '/img/movies/starwars2.jpg'},
            { 'title' : 'Capitan America', 'id' : 4, 'poster' : '/img/movies/capitanamerica.jpg'},
        ];

        //envio datos la vista como segundo parametro
        res.render('home', {
            listado : pelis
        });
    },

    faqs : (req, res) => {
        res.send('Aqui van las preguntas frecuentes');
    },
    contact : (req, res) => {
        res.send('formulario de contacto');
    },

    login : (req, res) => {
        res.render('auth/login');
    },

    register : (req, res) => {
        res.render('auth/register');
    },

    registerUser : (req, res) => {
        //aqui deberia de validar los datos, que no esten vacios, etc (mas adelante)
            let validation = validationResult(req)
            //console.log(validation);

            if (!validation.isEmpty()) {
                return res.render('auth/register', {errors : validation.errors});
            }

        //imaginemos que lo guardemos en el json o base de datos
            let avatar = '';
            //como es opcional, hago la validacion y reeplazo la variable avatar
            //este es el archivo que se subio con el upload.single de la ruta por post: req.file.path
            if (req.file) {
                //le saco la palabra public para que sea a partir de /img/...
                avatar = req.file.path.replace('public/', '/');
            }
            //creo el objeto usuario, deberia de tener una funcion constructora para eso
            let usuario = {
                id : 5, //deberia de ser auttomatico
                email : req.body.email,
                name : req.body.name,
                password : bcryptjs.hashSync(req.body.password, 5), //aqui encripto la pass
                avatar :  avatar
            } 
            console.log(usuario);
            //guardo en el json

            //TODO: que logee al usuario y muestre la pagina del perfil

            //enviar a otro html que se registro exitosamente

        return res.redirect('/');
    }
}