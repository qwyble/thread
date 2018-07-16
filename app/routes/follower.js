var follower = require('../controllers/followerController.js');


module.exports = function(app) {

  app.get('/getIsFollowing', function(req, res){
    follower.getIsFollowing(
      req.query.user,
      req.query.owner
    ).then((data) => {console.log(data); res.status(200).send(data)});
  })

  app.post('/follow', function(req, res){
    follower.follow(
      req.session.user.idUsers,
      req.body.owner
    ).then((data) => {res.status(200).send(data)})
    .catch(() => {res.status(200).send('ok')})
  })


  app.post('/unfollow', function(req, res){
    follower.unfollow(
      req.session.user.idUsers,
      req.body.owner
    ).then(() => res.status(200).send('ok'));
  })

  app.get('/getFollowing', function(req, res){
    follower.getFollowing(
      req.session.user.idUsers
    ).then(data =>
      res.status(200).send(data));
  })

  app.get('/getFollowers', function(req, res){
    follower.getFollowers(
      req.session.user.idUsers
    ).then(data => res.status(200).send(data));
  })

}
