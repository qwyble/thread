const {sequelize, Sequelize} = require('../db/dbConnect.js');
const Song = require('../models/song.js')(sequelize, Sequelize);
const User = require('../models/user.js')(sequelize, Sequelize);


module.exports = {
  getStream: function(owner){
  return (
    sequelize.query(
      `SELECT songs.*, users.userName
      FROM songs, users
      WHERE songs.owner = ${owner}
      AND songs.owner = users.idUsers;`,{
        type: sequelize.QueryTypes.SELECT
      }
    )
    )
  }
}
