const {sequelize, Sequelize} = require('../db/dbConnect.js');


module.exports = {

  send: function(recipient, subject, body, date, sender){
    return(
      sequelize.query(
        `INSERT INTO messages (recipient, subject, text, sender, date)
        VALUES (?, ?, ?, ?, ?);`,{
          replacements: [recipient, subject, body, sender, date],
          type: sequelize.QueryTypes.INSERT
        }
      )
    );
  },

  getMessages: function(user){
    return(
      sequelize.query(
        `SELECT idmessages, subject, sender, date, users.userName AS senderName
        FROM messages
          JOIN users
          ON sender = users.idUsers
        WHERE recipient = ?`, {
          replacements: [user],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },

  getMessage: function(user, messageId){
    return(
      sequelize.query(
        `SELECT idmessages, subject, text, sender, date, users.userName AS senderName
        FROM messages
          JOIN users
          ON sender = users.idUsers
        WHERE recipient = ? AND idmessages = ?`, {
          replacements: [user, messageId],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },

  deleteMessages: function(user, messages){
    return(
      sequelize.query(
        `DELETE FROM messages
        WHERE idmessages IN (?) AND recipient = ?`,{
          replacements: [messages, user],
          type: sequelize.QueryTypes.DELETE
        }
      )
    )
  },

  getSentMessages: function(user){
    return(
      sequelize.query(
        `SELECT idmessages, subject, recipient, date, users.userName AS recipientName
        FROM messages
          JOIN users
          ON recipient = users.idUsers
        WHERE sender = ?`, {
          replacements: [user],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  }

}
