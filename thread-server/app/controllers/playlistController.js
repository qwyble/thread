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
        WHERE categories.idcategories = "${catid}" AND categories.owner=${owner};`
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

  getCatOwner: function(profile){
    return(
      sequelize.query(
        `SELECT users.userName
        FROM users
        WHERE users.idUsers = ?`,{
          replacements: [profile],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },


  getCats: function(user, profile){
    if(!profile){
      return(
        sequelize.query(
          `SELECT categories.name AS catname, categories.idcategories as catid, playlists.name AS plname, playlists.idplaylists as plid, playlists.isPublic as isPublic FROM categories
          LEFT JOIN playlists
          ON categories.idcategories = playlists.category
          WHERE categories.owner = ${user};`, {
            type: sequelize.QueryTypes.SELECT
          })
        )
    }else{
      return(
        sequelize.query(
          `SELECT
            categories.name AS catname,
            categories.idcategories as catid,
            playlists.name AS plname,
            playlists.idplaylists as plid,
            playlists.isPublic as isPublic
          FROM categories
            LEFT JOIN playlists
              ON categories.idcategories = playlists.category
          WHERE categories.owner = ${profile}
            AND playlists.isPublic = 1;`, {
            type: sequelize.QueryTypes.SELECT
          }
        )
      )
    }
  },

  makePublic: function(plid){
    return(
      sequelize.query(
        `UPDATE playlists
        SET isPublic = 1
        WHERE idplaylists = ?;`,{
          replacements: [plid],
          type: sequelize.QueryTypes.UPDATE
        }
      )
    )
  },

  makePrivate: function(plid){
    return(
      sequelize.query(
        `UPDATE playlists
        SET isPublic = 0
        WHERE idplaylists = ?;`,{
          replacements: [plid],
          type: sequelize.QueryTypes.UPDATE
        }
      )
    )
  }


}
