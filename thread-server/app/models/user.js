module.exports = function(sequelize, Sequelize){
  const User = sequelize.define('user', {
    idUsers:{
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    userName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING
    },
    playLists: Sequelize.JSON,
    forumLists: Sequelize.JSON,
    lastLoggedIn: Sequelize.DATE

  });
  return User;

}
