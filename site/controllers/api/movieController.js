const {check, validationResult, body} = require('express-validator');

const db = require('./../../database/models');
const { Op, literal } = require('sequelize');

module.exports = {

    index : (req, res) => {
        let offset = 0;
        let limit = 6;
        //si me mandan la pagina entonces voy a calcular el offset
        if (req.query.page) {
            offset = (req.query.page - 1) * limit;
        }

        //sino las traigo a todas
        db.Movie.findAndCountAll({
            order : [
                [(req.query.order ? req.query.order : 'title'), 'ASC']
            ],
            //esto lo useré en el paginador
            limit : limit,
            offset : offset,
            include : ['genre']
        })
        .then(function(data) {
            const movies = data.rows;
            const count = data.count;
            const pages = Math.ceil(count / limit);
            return res.status(200).send(
                { data: movies });
            })
        .catch(function(error){
            
        });
        
    },

    random : async (req,res) => {
        let movie = await db.Movie.findOne({ order: literal('rand()'), limit: 1 });
        
        return res.status(200).send(
            { data : movie } 
        );
    },


    detail : (req, res) => {
        //TODO
        //validar que exista el id que me pasaron por la url

        //aqui mando a mostrar los datos
        db.Movie.findByPk(req.params.id, { include : { all : true, nested : true}})
            .then(function(pelicula){
                res.render('movies/detail', {
                    pelicula : pelicula
                    });
            });        
        
    },

}