var playlist = require('../controllers/playlistController.js');

module.exports = function(app){
  app.post('/addPlaylist', function(req, res){
    console.log(req.body);
    playlist.add(
      req.body.category,
      req.body.playlist,
      req.session.user.idUsers
    )
  })
}
