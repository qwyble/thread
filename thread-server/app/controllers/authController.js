const {sequelize, Sequelize} = require('../db/dbConnect.js');

const User = require('../models/user.js')(sequelize, Sequelize);

module.exports = function(userName, email, password){
  User.create({
      userName: userName,
      email: email,
      password: password
    });
}
