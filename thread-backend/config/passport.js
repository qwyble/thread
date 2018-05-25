//load everything
var LocalStrategy = require('passport-local').Strategy;


//load up the user model
var User = require('../app/models/user');


//expose function to app using modules.exports

module.exports = function(passport){

  //passport session setup
  //required for persisten login sessions
  //passport needs ability to serialize and unserialize users out of sessions


  //serialize
  passport.serializeUser(function(user,done){
    done(null, user.id);
  });

  //deserialize
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });


  //local signupMessage
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done){

    //async
    //user.findone won't fire unless data is sent
    process.nextTick(function(){
      //find user whose email is the same as the forms email
      User.findOne({'local.email': email}, function(err, user){
        if(err)
          return done(err);

        if(user){
          return done(null, false, req.flash('signupMessage', 'that email is already taken.'));
        }else{

          //if email not taken, sign em up
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          //save the user
          newUser.save(function(err){
            if(err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });

  }

));


//handle login
passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {

  //find user
  //check if exists
  User.findOne({'local.email': email}, function(err, user){
    if(err)
      return done(err);

    if(!user)
      return done(null, false, req.flash('loginMessage', 'No user found.'));

    if(!user.validPassword(password))
      return done(null, false, req.flash('loginMessage', 'wrong password.'));

      //all is well
      return done(null, user);
  });
}

));

};
