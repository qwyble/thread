const User = require('./user.js');

module.exports = function(sequelize, Sequelize){
  const Song = sequelize.define('song',{
    idSongs: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    description:{
      type: Sequelize.STRING
    },
    genres: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'idUsers'
      }
    },
    dateUploaded: {
      type: Sequelize.DATE
    },
    URL: {
      type: Sequelize.STRING
    },
    fileName: {
      type: Sequelize.STRING
    }
  });
  return Song;
}
