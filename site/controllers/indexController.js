module.exports = {
    index : function(req, res, next) {

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
        res.send('Aqui van las preguntas frecuentes')
    },
    contact : (req, res) => {
        res.send('formulario de contacto')
    }
}