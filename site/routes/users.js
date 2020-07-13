const express = require('express');
const router = express.Router();
const db = require('../database/models');

router.post('/addFavourite', async function (req, res) {
    //Guardar en la base de datos la pelicula que le gusta al usuario

    if (!req.session || !req.session.user) {
        return res.json({ status : 401 , response : 'usuario no logeado'});
    }

    let user = await db.User.findByPk(req.session.user.id);
    
    let movie = await db.Movie.findByPk(req.body.movie_id);

    //uso el metodo magico add seguido del alias que coloque en la ralacion
    user.addFavorites(movie);

    //respondo en json, deberia de hacerlo con algun status
    return res.json({status : 200, response: "Pelicula Agregada a favoritos"});
});

module.exports = router;