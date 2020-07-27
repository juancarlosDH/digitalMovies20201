const {check, validationResult, body} = require('express-validator');

const db = require('./../../database/models');
const { Op, literal } = require('sequelize');

module.exports = {

    index : (req, res) => {
                //sino las traigo a todas
        db.Genre.findAll()
        .then(function(genres) {
            return res.status(200).send(
                { data: genres });
            })
        .catch(function(error){
            
        });
        
    },

}