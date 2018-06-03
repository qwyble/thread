const {sequelize, Sequelize} = require('../db/dbConnect.js');
const User = require('../models/user.js')(sequelize, Sequelize);


module.exports = {
  add: function(category, playlist, owner){
    console.log(category, playlist, owner);
    return (
      sequelize.query(
        `update users set playLists = JSON_MERGE_PRESERVE(playLists, \'{\"${category}\":\"${playlist}\"}\') where idUsers = ${owner};`
      )
    )
  }
}
