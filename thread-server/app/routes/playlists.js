var playlist = require('../controllers/playlistController.js');

module.exports = function(app){
  app.post('/addPlaylist', function(req, res){
    playlist.add(
      req.body.category,
      req.body.playlist,
      req.session.user.idUsers
    ).then((result) => {console.log(result)})
  }),

  app.post('/deletePlaylist', function(req, res){
    playlist.delete(
      req.body.category,
      req.body.playlist,
      req.session.user.idUsers
    )
  }),

  app.get('/getPlaylists', function(req, res){
    playlist.get(req.session.user.idUsers)
    .then((data) => {res.status(200).send(data.playLists);});
  })

  app.post('/editCat', function(req, res){
    console.log(req.body);
    playlist.overWrite(JSON.stringify(req.body), req.session.user.idUsers);
  })


}
