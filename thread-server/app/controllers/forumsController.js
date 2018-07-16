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
        `SELECT subject, threadpost.date, threadpost.idThreadPost as id,
        threadcategories.category, users.userName, tsubs.subs AS subs, trep.replies as replies
        FROM threadpost
          JOIN threadcategories
            ON idthreadcategories = threadpost.category
          JOIN users
            ON idUsers = UserId
          LEFT JOIN (
            SELECT threadsubs.ThreadId as tsubId, COUNT(idThreadSubs) as subs
            FROM threadsubs
            GROUP BY idThreadSubs
          ) as tsubs
            ON tsubs.tsubId = threadpost.idThreadPost
          LEFT JOIN (
            SELECT threadreplies.ThreadId as tId, COUNT(threadreplies.idThreadReplies) as replies
            FROM threadreplies
            GROUP BY threadreplies.ThreadId
          ) AS trep
            ON trep.tId = threadpost.idThreadPost
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
        WHERE idThreadPost = ?;`, {
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
  },


  getSubscribed: function(threadId, user){
    return(
      sequelize.query(
        `SELECT * FROM threadsubs
          WHERE ThreadId = ? AND UserId = ?
          LIMIT 1;`, {
            replacements: [threadId, user],
            type: sequelize.QueryTypes.SELECT
          }
      )
    )
  },


  subscribe: function(threadId, user){
    return(
      sequelize.query(
        `INSERT INTO threadsubs (ThreadId, UserId)
        VALUES (?, ?);`, {
          replacements: [threadId, user],
          type: sequelize.QueryTypes.INSERT
        }
      )
    )
  },


  unsubscribe: function(threadId, user){
    return(
      sequelize.query(
        `DELETE FROM threadsubs
        WHERE ThreadId = ? AND UserId = ?;`, {
          replacements: [threadId, user],
          type: sequelize.QueryTypes.DELETE
        }
      )
    )
  },


  getFeed: function(user){
    return(
      sequelize.query(
        `SELECT threadreplies.UserId, threadreplies.body, threadpost.subject, threadpost.idThreadPost, users.userName
        FROM threadreplies
          JOIN threadpost ON threadreplies.ThreadId = idThreadPost
          JOIN threadsubs on threadsubs.ThreadId = idThreadPost
          JOIN users ON idUsers = threadreplies.UserId
        WHERE threadsubs.UserId = ?
        ORDER BY threadreplies.date DESC
        LIMIT 10;`, {
          replacements: [user, user],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  }



}
