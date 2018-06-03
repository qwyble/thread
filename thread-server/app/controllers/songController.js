const {sequelize, Sequelize} = require('../db/dbConnect.js');
const Song = require('../models/song.js')(sequelize, Sequelize);


module.exports = {
  get: function(playlist, owner){
  return (Song.findAll({
            where: {
              owner: owner
            }
          })
        )
  }
}
