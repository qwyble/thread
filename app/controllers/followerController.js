const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {

  getIsFollowing: function(user, owner){
    return(
      sequelize.query(
        `SELECT * FROM usersfollowersbridge
            WHERE FollowerId = ?
              AND LeaderId = ?;`,{
          replacements: [user, owner],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },

  follow: function(user, owner){
    return(
      sequelize.query(
        `INSERT INTO usersfollowersbridge
        (FollowerId, LeaderId)
        VALUES (?, ?);`,{
          replacements: [user, owner],
          type: sequelize.QueryTypes.INSERT
        }
      )
    )
  },


  unfollow: function(user, owner){
    return(
      sequelize.query(
        `DELETE FROM usersfollowersbridge
        WHERE FollowerId = ? AND LeaderId = ?;`, {
          replacements: [user, owner],
          type: sequelize.QueryTypes.DELETE
        }
      )
    )
  },

  getFollowing: function(user){
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
        WHERE idUsers IN (
          SELECT LeaderId FROM usersfollowersbridge
          WHERE FollowerId = ?
        )
        GROUP BY idUsers
        ORDER BY userName
        LIMIT 40`,{
          replacements: [user],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },

  getFollowers: function(user){
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
        WHERE idUsers IN (
          SELECT FollowerId FROM usersfollowersbridge
          WHERE LeaderId = ?
        )
        GROUP BY idUsers
        ORDER BY userName
        LIMIT 40`,{
          replacements: [user],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )

  }



}
