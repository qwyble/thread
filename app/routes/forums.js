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
      req.body.date,
      req.session.user.idUsers
    )
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
  })


  app.get('/getThreads/:catId', function(req, res){
    if (req.params.catId === 'all') var catId = '%';
    else var catId = req.params.catId;
    forums.getThreads(catId)
    .then(data => res.status(200).send(data))

  })



  app.get('/getThread', function(req, res){
    forums.getThread(req.query.id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
  })



  app.post('/deleteThread', function(req, res){
    forums.deleteThread(req.body.id, req.session.user.idUsers)
    .then(() => res.status(200).send('ok'))
  })


  app.post('/postComment', function(req, res){
    forums.postComment(
      req.body.threadId,
      req.body.comment,
      req.session.user.idUsers,
      req.body.date
    ).then(() => res.status(200).send('ok'));
  })


  app.get('/getComments/:threadId', function(req, res){
    forums.getComments(
      req.params.threadId
    ).then((data) => res.status(200).send(data));
  })


  app.get('/getSubscribed/:threadId', function(req, res){
    forums.getSubscribed(
      req.params.threadId,
      req.session.user.idUsers
    ).then((data) => res.status(200).send(data));
  })

  app.post('/subscribe/sub', function(req, res){
    forums.subscribe(
      req.body.threadId,
      req.session.user.idUsers
    ).then(() => res.status(200).send('ok'));
  })

  app.post('/subscribe/unsub', function(req, res){
    forums.unsubscribe(
      req.body.threadId,
      req.session.user.idUsers
    ).then(() => res.status(200).send('ok'));
  })


  app.get('/getForumFeed', function(req, res){
    forums.getFeed(
      req.session.user.idUsers
    ).then((data) => res.status(200).send(data))
  })


}
