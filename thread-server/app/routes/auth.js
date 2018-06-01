
var validator = require('validator')
var auth = require('../controllers/authController');

module.exports = function(app){

  app.post('/auth/signup', function(req, res){
      try{
        auth.signup(
        req.body.userName,
        req.body.email,
        req.body.password
      ).then((user) => {
        req.session.user = user;
        req.session.save();
        res.status(200).send(user)
      });
      }
      catch(err){
        res.status(400).send(err);
      }
  });

  app.post('/auth/login', function(req, res){
      try{
        auth.login(
          req.body.email,
          req.body.password
        ).then((user) => {
          if(!user.password){
            res.status(400).send(user);
          }else{
            req.session.user = user;
            req.session.save();
            res.status(200).send(user);
          }
        });
      }
      catch(err){
        res.status(400).send(err);
      }
  });

  app.post('/logout', function(req, res){
    req.session.destroy();
    res.status(200).send('logged out');
  })

  app.get('/auth', function(req, res){
    console.log(req.session.user);
    if (req.session.user){
      res.status(200).send(req.session.user);
    }else{
      res.status(200).send('not logged in');
    }
  });
}
