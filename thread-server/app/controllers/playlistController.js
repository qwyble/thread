const {sequelize, Sequelize} = require('../db/dbConnect.js');
const User = require('../models/user.js')(sequelize, Sequelize);


module.exports = {
  add: function(category, playlist, owner){
    console.log(category, playlist, owner);
    return (
      sequelize.query(
        `update users set playLists =
        JSON_MERGE_PRESERVE(COALESCE(playLists, '{}'), '{"${category}":"${playlist}"}')
        where idUsers = ${owner};`
      )
    )
  },

  get: function(owner){
    return(
      User.findOne({
        attributes: ['playLists'],
        where:{
          idUsers: owner
        },
        raw: true
      })
    )
  },

  delete: function(category, playlist, owner){
    return(
      sequelize.query(
        `update users set playLists =
        JSON_REMOVE(playLists, '$."${category}"[${playlist}]')
        where idUsers = ${owner};`
      )
    )
  },

  overWrite: function(categories, owner){
    console.log(categories)
    return(
      sequelize.query(
        `UPDATE users SET playLists = ('${categories}') WHERE idUsers = ${owner}`
      )
    )
  }
}
