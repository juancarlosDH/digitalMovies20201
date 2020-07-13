const moviesData = require('./../models/movie');
const genresData = require('./../models/genre');
const {check, validationResult, body} = require('express-validator');

const db = require('./../database/models');
const { Op } = require('sequelize');

const ombdResource = require('../resources/omdb/omdbResource');

module.exports = {

    index : (req, res) => {
        //ahora voy a usar una parte del MVC que se encarga de los datos, la cual es el Modelo
        //ella se encarga de consultar el json y traer los datos.
        let movies = [];
        //como tengo un formulario de busqueda, y es opcional voy a preguntar si me enviaron el dato de filtrado y obtener esas pelis
        if (req.query.busqueda) {
            //cree un metodo dentro del modelo para filtrarlos y le paso lo que viene por el formulario por get
            //movies = moviesData.filterByTitle(req.query.busqueda);

            db.Movie.findAll({
                where : {
                    title : {
                        [Op.like] : '%' + req.query.busqueda + '%'
                    }
                },
                order : [
                    ['title', 'ASC']
                ]
            })
            .then(function(movies) {
                return res.render('movies/index', { movies });
            })
        } else {
            //sino las traigo a todas
            db.Movie.findAll({
                order : [
                    [(req.query.order ? req.query.order : 'title'), 'ASC']
                ],
                //esto lo useré en el paginador
                /*limit : 3,
                offset : 3*/
                include : ['genre']
            })
            .then(function(movies) {
                return res.render('movies/index', { movies });
            })
            .catch(function(error){
                
            });
            //movies = moviesData.findAll();
        }
        
    },

    //esto lo voy a hacer asincrono, basicamente para entender como podemos hacer para que la promesa de la Base de datos se resuelva en el momento
    formCreate : async (req, res) => {
        //Me traigo los generos usando el json
        //let genres = genresData.findAll();
        //Ahora voy a usar la BD, aqui le coloqué el await para que me devuelva los datos y no usemos el .then()
        let genres = await db.Genre.findAll();
        //console.log(genres);
            //.then(function(genres){  //lo comenté ya que no lo voy a necesitar.
        //y los mando a la vista
        return res.render('movies/create', {genres});
            //});
    },

    create : (req, res) => {

        const errors = validationResult(req);
        //TODO
        //los datos validados vienen por express-validator
        if (!errors.isEmpty()){
            //TO-DO: mandar errores a la vista, no asi...
            return res.send(errors.mapped());
        }            

        //aqui guardo la peli en el json
        //creo el objeto pelicula, deberia de tener una funcion constructora para eso
        let poster = '';
        if (req.file) {
            //le saco la palabra public para que sea a partir de /img/...
            poster = req.file.filename;
        }
        //generé el objeto movie
        let movie = {
            title : req.body.title,
            rating : req.body.rating,
            poster : poster,
            genreId : req.body.genreId,
            description : req.body.description,
            length : 100,
            awards : 0
        } 

        //guardo en el json usando el Modelo
        //moviesData.create(movie);
        db.Movie.create(movie)
            .then(function(){
                //redireccionar a listado de peliculas
                return res.redirect('/movies');
            }).catch(function(error){
                console.error(error);
                //TO-DO make error general in an div, res.locals....
                return res.redirect('/movies/create')
            })

        
    },

    delete : (req, res) => {
        //TODO
        //validar que exista el id que me pasaron por la url

        //aqui elimino la peli en el json (pendiente)

        //redireccionar a listado de peliculas
        res.redirect('/movies');
    },

    formEdit : (req, res) => {
        //TODO
        //validar que exista el id que me pasaron por la url
        let movieId = req.params.id;

        //decirle al modelo que me busque la pelicula
        //let peliEncontrada = moviesData.findByPK(movieId);

        //Me traigo los generos
        //let genres = genresData.findAll();
        let genres = db.Genre.findAll(); //aqui tengo la primera promesa de la base de datos

        //muestro el formulario de la movie con sus datos
        //res.render('movies/edit', { movie : peliEncontrada, genres});

        let movie = db.Movie.findByPk(req.params.id); //aqui tengo al segunda promesa de la base de datos

        //Como son dos promesas, tengo que usar Promise
        Promise.all([genres, movie]) //en este ordenes que tambien voy a recibir los datos
        //una vez que las dos esten listas
            .then(function(datos){ //le pueden cambiar el nombre
                //entonces vamos a usar los resultados, entonces datos es un array donde la [0] es generos y [1] la movie que busqué
                res.render('movies/edit', { movie : datos[1], genres: datos[0] });
            });  
    },

    //esta funcion la convierto a sincrona para trabajar de manera mas comoda las promesas de sequelize
    edit : async (req, res) => {
        //TODO
        //validar los datos (mas adelante)

        //busco la pelicula
        let movieId = req.params.id;
        //uso el await para esperar que termine la promesa
        let movie = await db.Movie.findByPk(movieId);

        //cambio los atributos
        movie.title = req.body.title;
        movie.rating = req.body.rating;
        movie.genreId = req.body.genreId;
        movie.awards = req.body.awards;
        movie.length = req.body.length;
        movie.releaseDate = req.body.releaseDate;
        
        movie.description = req.body.description;
        //si me enviaste la imagen nueva
        if (req.file) {
            //le saco la palabra public para que sea a partir de /img/...
            movie.poster = req.file.filename;
        }
        
        //aqui edito la peli en la base de datos, uso await para esperar que termine la promesa
        await movie.save();

        //redireccionar a listado de peliculas
        res.redirect('/movies');
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

    saveOmdb : function (req, res) {
        //deberia de invocar al resource o cliente de omdb
        ombdResource.getMovieFromImdb(req.params.imdbID)
            .then(function(response) {
                console.log(response);

                //TO-DO guardar en mi base de datos
                let movie = {
                    title : response.data.Title,
                    genreId : 1, //
                    length : 100,
                };

                db.Movie.create(movie)
                .then(function(){
                    //redireccionar a listado de peliculas
                    return res.redirect('/movies');
                }).catch(function(error){
                    console.error(error);
                    //TO-DO make error general in an div, res.locals....
                    return res.redirect('/movies')
                })


                //return res.send('Guardada en mi BD');
            }).catch(function(error) {
                console.log(error);
            })

    }

}