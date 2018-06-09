const {sequelize, Sequelize} = require('../db/dbConnect.js');
const User = require('../models/user.js')(sequelize, Sequelize);


module.exports = {

  addCategory: function(category, owner){
    return (
      sequelize.query(
        `INSERT INTO categories (name, owner, isPublic)
        VALUES ("${category}", ${owner}, 0);`
      )
    )
  },

  deleteCategory: function(catid, owner){
    return(
      sequelize.query(
        `DELETE FROM categories
        WHERE categories.idcategoriy = "${catid}" AND categories.owner=${owner};`
      )
    )
  },

  renameCategory: function(catid, name, owner){
    return(
      sequelize.query(
        `UPDATE categories
        SET name = "${name}"
        WHERE idcategories = "${catid}" AND owner=${owner};`
      )
    )
  },

  addPlaylist: function(catid, playlist, owner){
    console.log(catid, playlist);
    return (
      sequelize.query(
        `INSERT INTO playlists (name, category)
        VALUES ("${playlist}", ${catid});`
      )
    )
  },


  deletePlaylist: function(plid, catid, owner){
    return(
      sequelize.query(
        `DELETE FROM playlists
        WHERE idplaylists = "${plid}" AND category = ${catid};`
      )
    )
  },


  getCats: function(owner){
    return(
      sequelize.query(
        `SELECT categories.name AS catname, categories.idcategories as catid, playlists.name AS plname, playlists.idplaylists as plid FROM categories
        LEFT JOIN playlists
        ON categories.idcategories = playlists.category
        WHERE categories.owner = ${owner};`, {
        type: sequelize.QueryTypes.SELECT
      })
    )
  }


}
