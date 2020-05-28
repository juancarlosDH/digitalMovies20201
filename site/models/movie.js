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
    },

    filterByTitle : function (title){
        let array = this.findAll();
        //filtramos los datos
        return array.filter(function(movie) {
            //hago que ambos string sean minusculas con .toLowerCase()
            //tambien para filtrar y que contenga en cualquier parte esa palabra que me pasaron "title"
            //para que funcione aplicamos una expresion regular, muy sencilla y facil
            search = new RegExp(title.toLowerCase())
            //luego aplicamos el search para hacer una busqueda de esas letras dentro del titulo de cada pelicula, retornara -1 si no la encuentra
            return movie.title.toLowerCase().search(search) >= 0;
        });
    }
}

module.exports = movieData;