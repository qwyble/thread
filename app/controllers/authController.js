var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
const {sequelize, Sequelize} = require('../db/dbConnect.js');

const User = require('../models/user.js')(sequelize, Sequelize);



module.exports ={


signup: function(userName, email, password){
  if(password.length < 4){
    return new Promise(function(resolve){resolve("longer password, pretty-please.")});
  }else if(!validator.isEmail(email)){
    return new Promise(function(resolve){resolve("not a valid email")});
  }else if(!userName){
    return new Promise(function(resolve){resolve("please enter a username")});
  }else{
    var hash = bcrypt.hashSync(password);
    return(
      User.create({
        userName: userName,
        email: email,
        password: hash
      }).then((user) => {return(user.dataValues)})
    )
  }
},



login: function(email, password){
  if(!password){
    return new Promise(function(resolve){resolve("Password is required")});
  }
  if(!email){
    return new Promise(function(resolve){resolve("Email is required")});
  }else{
    return(
      User.findOne({
        where: {email: email}
      }).then((user) => {
        if(!user){
          return "email not found...";
        }else if(user){
          var passVal = bcrypt.compareSync(password, user.dataValues.password);
        }
        if(!passVal){
          return "incorrect password";
        }else{
          return user.dataValues;
        }
      })
    )
  }
  },

  getUser: function(user){
    return(
      sequelize.query(
        `SELECT users.userName as userName, users.email as email, users.imageUrl as imageUrl
        FROM users
        WHERE users.idUsers = ?`,{
          replacements: [user],
          type: sequelize.QueryTypes.SELECT
        }
      )
    )
  },

  editUser: function(email, username, id){
    return(
      sequelize.query(
        `UPDATE users SET
        email = ?, username = ?
        WHERE idUsers = ?`, {
          replacements: [email, username, id],
          type: sequelize.QueryTypes.UPDATE
        }
      )
    )
  }

};
