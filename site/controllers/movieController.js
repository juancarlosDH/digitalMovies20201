const moviesData = require('./../models/movie');

module.exports = {

    index : (req, res) => {
        //ahora voy a usar una parte del MVC que se encarga de los datos, la cual es el modelo
        //ella se encarga de consultar el json y traer los datos.
        let movies = moviesData.findAll();

        res.render('movies/index', { movies });
    },

    formCreate : (req, res) => {
        res.render('movies/create');
    },

    create : (req, res) => {
        //TODO
        //validar los datos (mas adelante)

        //aqui guardo la peli en el json
        //creo el objeto pelicula, deberia de tener una funcion constructora para eso
        let poster = '';
        if (req.files) {
            //le saco la palabra public para que sea a partir de /img/...
            poster = req.files[0].path.replace('public/', '/');
        }
        let movie = {
            title : req.body.title,
            rating : req.body.rating,
            poster : poster
        } 

        //guardo en el json
        //moviesData.create(movie);

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

        let pelis = moviesData.findAll();

        let pelicula = pelis.find(function (peli) {
            return req.params.id == peli.id;
        });
        
        res.render('movies/detail', {
            pelicula : pelicula
            });
    }

}