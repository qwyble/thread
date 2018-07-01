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

  postThread: function(category, subject, body, date, user){
    return(
      sequelize.query(
        `INSERT INTO threadpost
        (category, subject, body, UserId, date)
        VALUES (?, ?, ?, ?, ?);`, {
          replacements: [category, subject, body, user, date],
          type: sequelize.QueryTypes.INSERT
        }
      )
    )
  },

  getThreads: function(catId){
    return(
      sequelize.query(
        `SELECT subject, date, threadpost.idThreadPost as id, threadcategories.category, users.userName
        FROM threadpost
          JOIN threadcategories
            ON idthreadcategories = threadpost.category
          JOIN users
            ON idUsers = UserId
        WHERE idthreadcategories LIKE ?
        ORDER BY date desc
        LIMIT 20;`,{
          replacements: [catId],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },


  getThread: function(id){
    return(
      sequelize.query(
        `SELECT threadpost.*, userName FROM threadpost
          JOIN users
            ON idUsers = UserId
        WHERE idThreadPost = ?`, {
          replacements: [id],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },


  deleteThread: function(id, user){
    return(
      sequelize.query(
        `DELETE FROM threadpost
        WHERE idThreadPost = ? AND UserId = ?`,{
          replacements: [id, user],
          type: sequelize.QueryTypes.DELETE
        }
      )
    )
  },


  postComment: function(threadId, comment, user, date){
    return(
      sequelize.query(
        `INSERT INTO threadreplies (ThreadId, body, UserId, date)
        VALUES (?, ?, ?, ?)`, {
          replacements: [threadId, comment, user, date],
          type: sequelize.QueryTypes.INSERT
        }
      )
    )
  },


  getComments: function(threadId){
    return(
      sequelize.query(
        `SELECT threadreplies.*, userName, imageUrl FROM threadreplies
          JOIN users
            ON UserId = idUsers
        WHERE ThreadId = ?;`,{
          replacements: [threadId],
          type: sequelize.QueryTypes.SELECT,
        }
      )
    )
  }

}
