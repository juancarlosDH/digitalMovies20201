'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('genres', [
      { name: 'Acción', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Aventura', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ciencia Ficción', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Triller', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Drama', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Comedia', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('genres', null, {});
  }
};
