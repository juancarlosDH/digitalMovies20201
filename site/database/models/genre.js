
module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        name : {
            type : DataTypes.STRING(100)
        }
    },{
        tableName: 'genres',
        timestamps : false
    });

    Genre.associate = function(models) {
        // associations can be defined here
        Genre.hasMany(models.Movie, {
          as : "movies",
          foreingKey : "genreId"
        });
      };

    return Genre;
}