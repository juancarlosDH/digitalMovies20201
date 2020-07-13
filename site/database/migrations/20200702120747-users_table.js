'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : {
        type : Sequelize.STRING(50),
        allowNull: false
      },
      email : {
        type : Sequelize.STRING(50),
        allowNull: false,
        unique : true
      },
      password : {
        type : Sequelize.STRING(200),
        allowNull: false
      },
      admin : {
        type : Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
      });


      
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
