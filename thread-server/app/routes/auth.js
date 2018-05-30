var cors = require('cors');
var auth = require('../controllers/authController');
module.exports = function(app){
  app.post('/auth/signup', cors(), function(req, res){
    auth(
      req.body.userName,
      req.body.email,
      req.body.password
    );
    res.send();
  });

  app.get('/auth/login', cors(), function(req,res){
    res.send('hello');
  })
  app.get('/auth/signup', cors(), function(req,res){
    res.send('you failed');
  })



}
