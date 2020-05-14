module.exports = {

    index : (req, res) => {
        console.log(req.query.busqueda);
        let pelis = [
            { 'title' : 'Guardianes de la Galaxia', 'id' : 1, 'poster' : '/img/movies/guardianesdelagalaxia.jpg'},
            { 'title' : 'Avengers', 'id' : 2, 'poster' : '/img/movies/avengers.jpg'},
            { 'title' : 'StarWars', 'id' : 3, 'poster' : '/img/movies/starwars2.jpg'},
            { 'title' : 'Capitan America', 'id' : 4, 'poster' : '/img/movies/capitanamerica.jpg'},
        ];

        res.render('movies/index', {
            listado : pelis
            });
    },

    formCreate : (req, res) => {
        res.render('movies/create');
    },

    create : (req, res) => {
        //TODO
        //validar los datos (mas adelante)

        //aqui guardo la peli en el json (pendiente)
        //creo el objeto pelicula, deberia de tener una funcion constructora para eso
        let pelicula = {
            id : 5,
            title : req.body.title,
            poster : req.files[0].path 
        } 

        console.log(pelicula);
        //guardo en el json

        //redireccionar a listado de peliculas
        res.redirect('/movies');
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

        let pelis = [
            { 'title' : 'Guardianes de la Galaxia', 'id' : 1, 'poster' : '/img/movies/guardianesdelagalaxia.jpg'},
            { 'title' : 'Avengers', 'id' : 2, 'poster' : '/img/movies/avengers.jpg'},
            { 'title' : 'StarWars', 'id' : 3, 'poster' : '/img/movies/starwars2.jpg'},
            { 'title' : 'Capitan America', 'id' : 4, 'poster' : '/img/movies/capitanamerica.jpg'},
        ];

        let pelicula = pelis.find(function (peli) {
            return req.params.id == peli.id;
        });
        
        res.render('movies/detail', {
            pelicula : pelicula
            });
    }

}