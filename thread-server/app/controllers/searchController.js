const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {


  getUsers: function(searchString){
    if(!searchString){
      return sequelize.query(
        `SELECT * FROM users;`, {
          type: sequelize.QueryTypes.SELECT
        }
      )
    }else{
      return(
        sequelize.query(
          `SELECT * FROM users WHERE userName LIKE ?`,{
            replacements: ['%'+searchString+'%'],
            type: sequelize.QueryTypes.SELECT
          }
        )
      )
    }
  }
}
