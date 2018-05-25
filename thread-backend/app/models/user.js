var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define schema for user model
var userSchema = mongoose.Schema({
local: {
  email: String,
  password: String,
}

});

//generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


//check for valid pw
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


//create model for users and expose to our app
module.exports = mongoose.model('User', userSchema);
