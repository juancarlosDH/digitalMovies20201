'use strict';
module.exports = (sequelize, DataTypes) => {

  const Movie = sequelize.define('Movie', {
    title: DataTypes.STRING,
    rating: DataTypes.DECIMAL(3,1),
    awards : DataTypes.INTEGER,
    genreId : DataTypes.INTEGER,
    releaseDate : DataTypes.DATE,
    poster : DataTypes.STRING,
    length : DataTypes.INTEGER
  }, {
      tableName : 'movies'
  });

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.Genre, {
      as : "genre",
      foreingKey : "genreId"
    });
  };

  return Movie;
};