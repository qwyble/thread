const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {

  addSongsToPlaylist: function(songs, playlist, owner){
    var songsList = [];
    for(var i = 0; i < songs.length; i++){
      songsList.push([songs[i], playlist])
    }
    var insert = songsList;

    return (
      sequelize.query(
        `INSERT IGNORE INTO songsplaylistsbridge (song, playlist)
        VALUES :insert;`, {
          replacements: {insert: insert}
        }
      )
    )
  },


  deleteFromPlaylist: function(songs, playlist, owner){
    return(
      sequelize.query(
        `DELETE FROM songsplaylistsbridge
        WHERE song IN (?) AND playlist = ?;`,{
          replacements: [songs, playlist],
          type: sequelize.QueryTypes.DELETE
        }
      )
    )
  }

}
