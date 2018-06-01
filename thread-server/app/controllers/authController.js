var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
const {sequelize, Sequelize} = require('../db/dbConnect.js');

const User = require('../models/user.js')(sequelize, Sequelize);



module.exports ={


signup: function(userName, email, password){
  if(password.length < 4){
    throw "longer password, pretty-please.";
  }else if(!validator.isEmail(email)){
    throw "not a valid email.";
  }else if(!userName){
    throw "please enter a username.";
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
    throw "password is required";
  }
  if(!email){
    throw "email is required";
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
}
};
