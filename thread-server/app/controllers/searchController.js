const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {


  getUsers: function(searchString){
    return(
      sequelize.query(
        `SELECT idUsers, userName FROM users WHERE userName LIKE ?
        ORDER BY userName
        LIMIT 40`,{
          replacements: ['%'+searchString+'%'],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },


  getSongs: function(searchString){
    return(
      sequelize.query(
        `SELECT title, idSongs, userName FROM songs
          JOIN users ON songs.owner = users.idUsers
        WHERE title LIKE ?
        ORDER BY title
        LIMIT 40`,{
          replacements: ['%'+searchString+'%'],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },


  getPlaylists: function(searchString){
    return(
      sequelize.query(
        `SELECT * FROM playlists WHERE name LIKE ?
        ORDER BY name
        LIMIT 40`,{
          replacements: ['%'+searchString+'%'],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  }
}
