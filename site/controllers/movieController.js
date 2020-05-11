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

    create : (req, res) => {
        res.render('movies/create');
    },

    save : (req, res) => {

    },

    delete : (req, res) => {

    },

    formEdit : (req, res) => {

    },

    edit : (req, res) => {

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