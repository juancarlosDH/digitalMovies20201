
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(50)
    },
    email: {
      type : DataTypes.STRING(50)
    },
    password : {
      type : DataTypes.STRING(200)
    },
    avatar : {
      type : DataTypes.STRING(300)
    },
    admin : {
      type : DataTypes.BOOLEAN
    }
  },
  {
    tableName : 'users'
  });

  Model.associate = function(models) {
    // associations can be defined here
    Model.belongsToMany(models.Movie, { 
      as : 'favorites',
      through: 'movie_user',
      foreignKey : 'userId',
      otherKey : 'movieId',
    });
  };

  return Model;
};