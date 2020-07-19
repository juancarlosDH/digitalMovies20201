'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('movies', {
      fields : ['genreId'],
      type: 'FOREIGN KEY',
      name: 'FK_movie_genre', // useful if using queryInterface.removeConstraint
      references: {
        table: 'genres',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('movies', 'FK_movie_genre');
  }
};
