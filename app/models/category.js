const User = require('./user.js');

module.exports = function(sequelize, Sequelize){
  const Category = sequelize.define('category', {
    idcategories: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'idUsers'
      }
    },
    isPublic: {
      type: Sequelize.BOOLEAN
    }

  });
  return Category;
}
