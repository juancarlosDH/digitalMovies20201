// recuerden instalar con npm: nm install bcrypjs --save
const bcryptjs = require('bcryptjs');

const db = require('../database/models');

const { validationResult } = require('express-validator')


module.exports = {
    login : async (req, res) => {
        //return res.send(req.cookies);
        res.render('auth/login', {errors : {}, body : {}});
    },

    loginPost: (req, res) => {
        //antes deberia de revisar si está la cookie
        //deberia de validar datos
        let validation = validationResult(req)
        console.log(validation.mapped());

        if (!validation.isEmpty()) {
            //return res.send(validation.mapped());
            return res.render('auth/login', {errors : validation.mapped(), body : req.body});
        }

        //ahora voy a guardar la cookie de mantenerme logeado
        if (req.body.mantenerme) {
            //aqui si creo la cookie y que expire en 90 dias
            res.cookie('_rememberUser_', req.body.email,  {expires: new Date(Date.now() + 1000*60*60*24*90)});
        }

        //logear al usuario
        req.session.logeado = true;
        res.locals.logeado = true;
        req.session.userEmail = req.body.email;

        console.log('me estoy logeando');
        return res.redirect('/');
    },

    register : (req, res) => {
        res.render('auth/register', {errors : {}, body : {}});
    },

    registerUser : (req, res) => {
        //aqui deberia de validar los datos, que no esten vacios
            let validation = validationResult(req)
            console.log(validation.mapped());

            if (!validation.isEmpty()) {
                //return res.send(validation.mapped());
                return res.render('auth/register', {errors : validation.mapped(), body : req.body});
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
                email : req.body.email,
                name : req.body.name,
                password : bcryptjs.hashSync(req.body.password, 5), //aqui encripto la pass
                avatar :  avatar
            } 
            //console.log(usuario);
            //guardo en BD
            db.User.create(usuario)
                .then(function(){
                    //TODO: que logee al usuario y muestre la pagina del perfil
                    res.locals.logeado = true;
                    req.session.logeado = true;
                    req.session.userEmail = usuario.email;

                    //enviar a otro html que se registro exitosamente

                    return res.redirect('/profile');
                })
                .catch(function(error){
                    console.error(error);
                    //TO-DO make error general in an div, res.locals....
                    return res.redirect('/register')
                })
    },
    profile : (req, res) => {
        return res.send(req.session);
    },
    editProfile : (req,res) => {
        
        //obtengo al usuario
        let usuario = jsonTraemeAlUsuario(req.session.email);

        usuario.name = req.body.name;

        if (req.file) {
            //le saco la palabra public para que sea a partir de /img/...
            usuario.avatar = req.file.path.replace('public/', '/');
        }

        //usuario guardate
    }
}