
module.exports = {
    bio : function(req, res, next) {
        //primero busco en el json usando el id del request

        //si no esta mostrar
        if (false) {
            res.end('No encontré al heroe');
        }

        if ( req.params.ok != 'ok') {
            res.end('Superman, Lamento que no deseas saber mas nada de mi');
        }

        res.end('Aqui va la info de heroe');
    }
}