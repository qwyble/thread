const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {


  getUsers: function(searchString){
    return(
      sequelize.query(
        `SELECT idUsers, userName, imageUrl, COUNT(playlists.idplaylists) as playlistsCount, songsct.songsCount
        FROM users
          LEFT JOIN categories
            ON users.idUsers = categories.owner
          LEFT JOIN playlists
            ON playlists.category = categories.idcategories
          LEFT JOIN (
            SELECT owner, count(songs.idSongs) as songsCount FROM songs
            GROUP BY songs.owner
          ) AS songsct ON songsct.owner = users.idUsers
        WHERE userName LIKE ?
        GROUP BY idUsers
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
