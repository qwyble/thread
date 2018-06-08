const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {

  addSongsToPlaylist: function(songs, playlist, owner){
    return (
      sequelize.query(
        `INSERT INTO songsplaylistsbridge (song, playlist)
        VALUES ($1, $2);`, {
          bind: [songs, playlist]
        }
      )
    )
  }

}
