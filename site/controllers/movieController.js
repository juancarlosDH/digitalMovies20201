const moviesData = require('./../models/movie');
const genresData = require('./../models/genre');
const {check, validationResult, body} = require('express-validator')

module.exports = {

    index : (req, res) => {
        //ahora voy a usar una parte del MVC que se encarga de los datos, la cual es el Modelo
        //ella se encarga de consultar el json y traer los datos.
        let movies = [];
        //como tengo un formulario de busqueda, y es opcional voy a preguntar si me enviaron el dato de filtrado y obtener esas pelis
        if (req.query.busqueda) {
            //cree un metodo dentro del modelo para filtrarlos y le paso lo que viene por el formulario por get
            movies = moviesData.filterByTitle(req.query.busqueda);
        } else {
        //sino las traigo a todas
            movies = moviesData.findAll();
        }
        return res.render('movies/index', { movies });
    },

    formCreate : (req, res) => {
        //Me traigo los generos
        let genres = genresData.findAll();
        //y los mando a la vista
        return res.render('movies/create', {genres});
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
            poster = req.file.path.replace('public/', '/');
        }
        //generé el objeto movie
        let movie = {
            title : req.body.title,
            rating : req.body.rating,
            poster : poster,
            genreId : req.body.genreId,
            description : req.body.description
        } 

        //guardo en el json usando el Modelo
        moviesData.create(movie);

        //redireccionar a listado de peliculas
        return res.redirect('movies');
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
        let peliEncontrada = moviesData.findByPK(movieId);

        //Me traigo los generos
        let genres = genresData.findAll();

        //muestro el formulario de la movie con sus datos
        res.render('movies/edit', { movie : peliEncontrada, genres});
    },

    edit : (req, res) => {
        //TODO
        //validar los datos (mas adelante)

        //busco la pelicula
        let movieId = req.params.id;
        let movie = moviesData.findByPK(movieId);

        //cambio los atributos
        movie.title = req.body.title;
        movie.rating = req.body.rating;
        movie.genreId = req.body.genreId;
        movie.description = req.body.description;
        //si me enviaste la imagen nueva
        if (req.file) {
            //le saco la palabra public para que sea a partir de /img/...
            movie.poster = req.file.path.replace('public/', '/');
        }
        
        //aqui edito la peli en el json (pendiente)
        moviesData.update(movie);

        //redireccionar a listado de peliculas
        res.redirect('/movies');
    },

    detail : (req, res) => {
        //TO-DO deberia de estar en el modelo y no aqui, pero igual funciona.
        let pelis = moviesData.findAll();

        let pelicula = pelis.find(function (peli) {
            return req.params.id == peli.id;
        });
        
        res.render('movies/detail', {
            pelicula : pelicula
            });
    }

}