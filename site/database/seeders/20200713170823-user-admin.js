'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        email : 'admin@admin.com',
        password : bcryptjs.hashSync('123456', 2),
        createdAt: new Date(),
        updatedAt: new Date(),
        admin : true,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
