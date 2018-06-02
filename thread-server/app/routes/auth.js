
var validator = require('validator')
var auth = require('../controllers/authController');

module.exports = function(app){

  app.post('/auth/signup', function(req, res){
    auth.signup(
      req.body.userName,
      req.body.email,
      req.body.password
    ).then((data) => {
      if(!data.idUsers){
        res.status(400).send(data)
      }else{
        req.session.user = data;
        req.session.save();
        res.status(200).send(data)
      }
    });
  });

  app.post('/auth/login', function(req, res){
    auth.login(
      req.body.email,
      req.body.password
    ).then((data) => {
      if(!data.idUsers){
        res.status(400).send(data);
      }else{
        req.session.user = data;
        res.status(200).send(data);
      }
    });
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
