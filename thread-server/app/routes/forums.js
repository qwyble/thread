var forums = require('../controllers/forumsController.js');



module.exports = function(app){

  app.get('/getForumCategories', function(req,res){
    forums.getForumCategories(
      req.query.searchString
    )
    .then(data => (res.status(200).send(data)))
    .catch(err => (res.status(400).send(err)));
  })


  app.post('/postThread', function(req,res){
    forums.postThread(
      req.body.category,
      req.body.subject,
      req.body.body,
      req.session.user.idUsers
    )
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
  })


}
