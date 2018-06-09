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

  deleteCategory: function(catName, owner){
    return(
      sequelize.query(
        `DELETE FROM categories
        WHERE categories.name = "${catName}" AND categories.owner=${owner};`
      )
    )
  },

  renameCategory: function(catName, name, owner){
    return(
      sequelize.query(
        `UPDATE categories
        SET name = "${name}"
        WHERE name = "${catName}" AND owner=${owner};`
      )
    )
  },

  addPlaylist: function(catName, playlist, owner){
    console.log(catName, playlist);
    return (
      sequelize.query(
        `INSERT INTO playlists (name, category)
        VALUES ("${playlist}",
          (SELECT idcategories FROM categories
          WHERE name = "${catName}" AND owner = ${owner}
          LIMIT 1));`
      )
    )
  },


  deletePlaylist: function(plName, catName, owner){
    return(
      sequelize.query(
        `DELETE FROM playlists
        WHERE name = "${plName}" AND category =
          (SELECT idcategories FROM categories
          WHERE name = "${catName}" AND owner = ${owner}
          LIMIT 1);`
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
