const axios = require('axios');

const defaults = require('./defaults');

module.exports = {
    getMovieFromImdb : function (omdbId){
        return axios({
            ...defaults,
            method : 'get',
            url : '/',
            params : {
                i : omdbId,
                apikey : 'a7935ed',
            }
        });
    }
}