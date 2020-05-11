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
        res.send('Aqui van las preguntas frecuentes');
    },
    contact : (req, res) => {
        res.send('formulario de contacto');
    },

    login : (req, res) => {
        res.render('auth/login');
    },

    register : (req, res) => {
        res.render('auth/register');
    },

    registerUser : (req, res) => {
        console.log(req.body);

        //aqui deberia de validar los datos, que no esten vacios, etc

        //imaginemos que lo guardemos en el json o base de datos

            //TODO que logee al usuario y muestre la pagina del perfil

            //enviar a otro html que se registro exitosamente

        res.redirect('/');
    }
}