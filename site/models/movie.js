const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../data/movies.json');

let movieData = {
    findAll : function () {
        //primero es verificar si el archivo existe
        if (!fs.existsSync(fileData)) {
            fs.writeFileSync(fileData, '');
        }
        //leo el archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');

        //convertir a array de js ese json, validando que tenga o no datos
        let movies = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return movies;
    },

    create : function (movie) {
        let array = this.findAll();
        //le asigno el ultimo id
        movie.id = this.lastID();
        //meto la pelicula
        array.push(movie);
        //convertir a json ese array con la peli nueva
        jsonData = JSON.stringify(array, null, " ");
        //escribo
        fs.writeFileSync(fileData, jsonData);
    },

    lastID : function (){
        let array = this.findAll();
        let lastID = 0;
        for (movie of array) {
            if (lastID < movie.id) {
                lastID = movie.id;
            }
        }
        return lastID + 1;
    }
}

module.exports = movieData;