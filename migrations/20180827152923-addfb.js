'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      //add facebook id and token columns to user table
      return queryInterface.addColumn('users', 'facebookId', Sequelize.STRING).then(function(){
        return queryInterface.addColumn('users', 'facebookToken', Sequelize.STRING);
      });
  },

  down: (queryInterface, Sequelize) => {
    //remove facebook id and token columns to user table
      return queryInterface.removeColumn('users', 'facebookId').then(function(){
        return queryInterface.removeColumn('users', 'facebookToken');
      });
  }
};
