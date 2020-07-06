'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'users',
      'avatar',
      {
        type: Sequelize.STRING(300),
        defaultValue: '',
        allowNull: true
      }
    );
  
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'avatar');
  }
};
