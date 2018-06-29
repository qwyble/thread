const {sequelize} = require('../db/dbConnect');


module.exports = {

  getForumCategories: function(searchString){
    return(
      sequelize.query(
        `SELECT category, idthreadcategories FROM threadcategories
        WHERE category LIKE ?
        ORDER BY category;`,{
          replacements: ['%'+searchString+'%'],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },

  postThread: function(category, subject, body, user){
    return(
      sequelize.query(
        `INSERT INTO threadpost
        (category, subject, body, UserId)
        VALUES (?, ?, ?, ?);`, {
          replacements: [category, subject, body, user],
          type: sequelize.QueryTypes.INSERT
        }
      )
    )
  }

}
