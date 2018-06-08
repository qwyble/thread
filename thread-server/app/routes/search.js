var search = require('../controllers/searchController.js');


module.exports = function(app){
  app.get('/getAllUsers', function(req, res){
    search.getUsers().then((data) => {console.log(data); res.send(data)});
  })


  app.get('/getAllUsers/:person', function(req, res){
    search.getUsers(
      req.params.person
    ).then((data) => {console.log(data); res.send(data)});
  })
}
