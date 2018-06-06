const {sequelize, Sequelize} = require('../db/dbConnect.js');
const Song = require('../models/song.js')(sequelize, Sequelize);


module.exports = {
  getStream: function(owner){
  return (Song.findAll({
            where: {
              owner: owner
            }
          })
        )
  }
}
