const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../data/genres.json');

let genreData = {
    findAll : function () {
        //primero es verificar si el archivo existe
        if (!fs.existsSync(fileData)) {
            fs.writeFileSync(fileData, '');
        }
        //leo el archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');

        //convertir a array de js ese json, validando que tenga o no datos
        let data = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return data;
    },

    findByPK : function(id) {
        return this.findAll().find(function(genre) {
            return genre.id == id;
        });
    },
}

module.exports = genreData;