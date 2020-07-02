'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movie_user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      },
      movieId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'movies'
          },
          key: 'id'
        },
        allowNull: false
      },
      });
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('movie_user');
  }
    
};
