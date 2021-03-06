'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: { 
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      rating : { type : Sequelize.DECIMAL(3,1) },
      awards : { type : Sequelize.INTEGER },
      genreId : { type : Sequelize.INTEGER },
      releaseDate : { type : Sequelize.DATE },
      poster : { type : Sequelize.STRING },
      length : { type : Sequelize.INTEGER }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('movies');
  }
};