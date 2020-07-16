'use strict';
const faker = require('faker');

const movies = [...Array(10)].map((movie) => (
  {
    title: faker.company.companyName(),
    rating: faker.random.number(50),
    length: faker.random.number(300),
    genreId : 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('movies', movies, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('movies', null, {});
  }
};
