// recuerden instalar con npm: nm install bcrypjs --save
const bcryptjs = require('bcryptjs');

const {check, validationResult, body} = require('express-validator')

const db = require('./../database/models')

module.exports = {
    //vuelvo asincrona la funcion
    index : async function(req, res, next) {

        //aqui uso el await para que me traiga las peliculas, hace que la promesa de BD se resueva de una vez.
        let pelis = await db.Movie.findAll({
            limit : 10,
            include : {
                all: true, nested : true
            }
        });

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
}