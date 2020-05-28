const moviesData = require('./../models/movie');
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
        res.render('movies/index', { movies });
    },

    formCreate : (req, res) => {
        //TO-DO: tengo que agregar generos...
        res.render('movies/create');
    },

    create : (req, res) => {

        const errors = validationResult(req);
        //TODO
        //los datos validados vienen por express-validator
        if (!errors.isEmpty()){
            //TO-DO: mandar errores a la vista, no asi...
            return res.send(errors);
        }            

        //aqui guardo la peli en el json
        //creo el objeto pelicula, deberia de tener una funcion constructora para eso
        let poster = '';
        if (req.file) {
            //le saco la palabra public para que sea a partir de /img/...
            poster = req.file.path.replace('public/', '/');
        }
        let movie = {
            title : req.body.title,
            rating : req.body.rating,
            poster : poster
        } 

        //guardo en el json
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
        console.log(req.params.id);


        //muestro el formulario de la movie con sus datos
        res.render('movies/edit', { movie : peliEncontrada});
    },

    edit : (req, res) => {
        //TODO
        //validar los datos (mas adelante)

        //aqui edito la peli en el json (pendiente)

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