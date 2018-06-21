const {sequelize, Sequelize} = require('../db/dbConnect.js');
const Song = require('../models/song.js')(sequelize, Sequelize);
const User = require('../models/user.js')(sequelize, Sequelize);


module.exports = {

  getStream: function(owner){
  return (
    sequelize.query(
      `SELECT songs.*, users.userName, songratings.rating
      FROM songs
        INNER JOIN users
          ON songs.owner = users.idUsers
        LEFT JOIN songratings
          ON songs.idSongs = songratings.song
          AND $1 = songratings.user
      WHERE songs.owner = $1
        OR songs.owner IN (
          SELECT LeaderId FROM usersfollowersbridge
          WHERE FollowerId = $1
        )
      ORDER BY songs.dateUploaded DESC
      LIMIT 40;`,{
        bind: [owner],
        type: sequelize.QueryTypes.SELECT
      }
    )
    )
  },

  getProfile: function(profile, owner){
    return(
      sequelize.query(
        `SELECT songs.*, users.userName, songratings.rating
        FROM songs
          INNER JOIN users
            ON songs.owner = users.idUsers
          LEFT JOIN songratings
            ON songs.idSongs = songratings.song
            AND songratings.user = $1
          WHERE songs.owner = $2
          ORDER BY songs.dateUploaded DESC
          LIMIT 40;`, {
            bind: [owner, profile],
            type: sequelize.QueryTypes.SELECT
          }
      )
    )
  },

  isPublic: function(plid){
    return (
      sequelize.query(
        `SELECT playlists.isPublic
        FROM playlists
        WHERE playlists.idplaylists = ?`,{
          replacements: [plid],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },

  getPubPlaylist: function(plid, owner){
    return (
      sequelize.query(
        `SELECT songs.*, users.userName, songratings.rating
        FROM songs
          INNER JOIN users
            ON songs.owner = users.idUsers
          LEFT JOIN songratings
            ON songs.idSongs = songratings.song
            AND users.idUsers = songratings.user
        WHERE songs.idSongs IN
          (SELECT song FROM songsplaylistsbridge WHERE
          songsplaylistsbridge.playlist = ?);`, {
            replacements: [plid, owner],
            type: sequelize.QueryTypes.SELECT
          }
      )
    )
  },

  getPrivPlaylist: function(plid, owner){
    return (
      sequelize.query(
        `SELECT songs.*, users.userName, songratings.rating
        FROM songs
          INNER JOIN users
            ON songs.owner = users.idUsers
          LEFT JOIN songratings
            ON songs.idSongs = songratings.song
            AND users.idUsers = songratings.user
        WHERE songs.idSongs IN
          (SELECT song FROM songsplaylistsbridge WHERE
          songsplaylistsbridge.playlist = ?
          AND songsplaylistsbridge.playlist IN (
            SELECT playlists.idplaylists
            FROM playlists
              INNER JOIN categories
                ON playlists.category = categories.idcategories
            WHERE categories.owner = ?));`, {
            replacements: [plid, owner],
            type: sequelize.QueryTypes.SELECT
          }
      )
    )
  },

  rateSong: function(songId, rating, userId){
    return(
      sequelize.query(
        `REPLACE INTO songratings (rating, song, user)
        values(${rating}, ${songId}, ${userId});`,{
          type: sequelize.QueryTypes.REPLACE
        }
      )
    )
  },

  getSong: function(songId){
    return(
      sequelize.query(
        `SELECT songs.title, songs.description, songs.owner, songs.genres
        FROM songs
        WHERE songs.idSongs = ?;`,{
          replacements: [songId],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  }
}
