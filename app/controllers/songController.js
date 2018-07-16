const {sequelize, Sequelize} = require('../db/dbConnect.js');
var SqlString = require('sequelize/lib/sql-string');
const Song = require('../models/song.js')(sequelize, Sequelize);
const User = require('../models/user.js')(sequelize, Sequelize);


module.exports = {

  getStream: function(owner, sortBy, order, currentItem){
  return (
    sequelize.query(
      `SELECT songs.*, users.userName, songratings.rating
      FROM songs
        INNER JOIN users
          ON songs.owner = users.idUsers
        LEFT JOIN songratings
          ON songs.idSongs = songratings.song
          AND ? = songratings.user
      WHERE songs.owner = ?
        OR songs.owner IN (
          SELECT LeaderId FROM usersfollowersbridge
          WHERE FollowerId = ?
        )
      ORDER BY ${sortBy} ${order}
      LIMIT ${currentItem}, 20;`,{
        replacements: [owner, owner, owner],
        type: sequelize.QueryTypes.SELECT
      }
    )
    )
  },

  getStreamCount: function(owner){
    return(
      sequelize.query(
        `SELECT COUNT(*) as count
        FROM songs
        WHERE songs.owner = ?
          OR songs.owner IN (
            SELECT LeaderId FROM usersfollowersbridge
            WHERE FollowerId = ?
          );`, {
          replacements: [owner, owner],
          type: sequelize.QueryTypes.SELECT
          }
      )
    )
  },

  getProfile: function(profile, owner, sortBy, orderBy){
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
          ORDER BY ${sortBy} ${orderBy}
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

  getPubPlaylist: function(plid, sortBy, order){
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
          songsplaylistsbridge.playlist = ?)
        ORDER BY ${sortBy} ${order}
        LIMIT 20;`, {
            replacements: [plid],
            type: sequelize.QueryTypes.SELECT
          }
      )
    )
  },

  getPrivPlaylist: function(plid, owner, sortBy, order){
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
            WHERE categories.owner = ?))
        ORDER BY ${sortBy} ${order}
        LIMIT 20;`, {
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
        values(?, ?, ?);`,{
          replacements: [rating, songId, userId],
          type: sequelize.QueryTypes.REPLACE
        }
      )
    )
  },

  getSong: function(songId){
    return(
      sequelize.query(
        `SELECT songs.*, users.userName as userName, COUNT(playlist) as playlists
        FROM songs
          LEFT JOIN users
            ON users.idUsers = songs.owner
          LEFT JOIN songsplaylistsbridge
            ON songs.idSongs = song
        WHERE songs.idSongs = ?
        GROUP BY song
        ;`,{
          replacements: [songId, songId],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  }
}
