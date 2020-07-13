'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'movies',
      'description',
      {
        type: Sequelize.STRING(300),
        defaultValue: '',
        allowNull: true
      }
    );
  
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('movies', 'description');
  }
};
