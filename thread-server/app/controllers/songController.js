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
          AND users.idUsers = songratings.user
      WHERE songs.owner = $1;`,{
        bind: [owner],
        type: sequelize.QueryTypes.SELECT
      }
    )
    )
  },

  rateSong: function(songId, rating, userId){
    console.log(songId, rating, userId)
    return(
      sequelize.query(
        `REPLACE INTO songratings (rating, song, user)
        values(${rating}, ${songId}, ${userId});`
      )
    )
  }
}
