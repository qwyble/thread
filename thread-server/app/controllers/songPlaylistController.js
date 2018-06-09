const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {

  addSongsToPlaylist: function(songs, playlist, owner){
    var songsList = [];
    for(var i = 0; i < songs.length; i++){
      songsList.push(`(${songs[i]}, ${playlist})`)
    }
    var insert = songsList.join(',');
    console.log(insert);
    return (
      sequelize.query(
        `INSERT INTO songsplaylistsbridge (song, playlist)
        VALUES $1;`, {
          bind: [insert]
        }
      )
    )
  }

}
