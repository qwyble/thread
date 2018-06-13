var playlist = require('../controllers/playlistController.js');

module.exports = function(app){

  app.post('/addCategory', function(req, res){
    playlist.addCategory(
      req.body.category,
      req.session.user.idUsers
    ).then(result => {res.status(200).send('ok')})
    .catch(err => {res.status(300).send({err: 'category name must be unique'})});
  })

  app.post('/deleteCategory', function(req, res){
    playlist.deleteCategory(
      req.body.catid,
      req.session.user.idUsers
    ).then((result) => {res.status(200).send('ok')})
  })

  app.post('/addPlaylist', function(req, res){
    playlist.addPlaylist(
      req.body.catid,
      req.body.playlist,
      req.session.user.idUsers
    ).then((result) => {res.status(200).send('ok')})
    .catch(err => {console.log(err)});
  }),

  app.post('/deletePlaylist', function(req, res){
    playlist.deletePlaylist(
      req.body.plid,
      req.body.catid,
      req.session.user.idUsers
    )
  }),

  app.get('/getPlaylists', function(req, res){
    playlist.getCats(req.session.user.idUsers)
    .then((data) => {res.status(200).send(data);});
  })

  app.post('/renameCat', function(req, res){
    console.log(req.body);
    playlist.renameCategory(
      req.body.catid,
      req.body.name,
      req.session.user.idUsers
    ).then(result => {res.status(200).send('ok')})
    .catch(err => {res.status(300).send({err: 'category name must be unique'})});
  })

  app.post('/makePublic', function(req, res){
    playlist.makePublic(
      req.body.plid
    ).then((result) => {res.status(200).send('looking good.')})
  })

  app.post('/makePrivate', function(req, res){
    playlist.makePrivate(
      req.body.plid
    ).then((result) => {res.status(200).send('looking good.')})
  })



}
