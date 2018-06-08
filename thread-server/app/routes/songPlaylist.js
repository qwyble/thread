var songPlaylist = require('../controllers/songPlaylistController.js');

module.exports = function(app){

  app.post('/addSongsToPlaylist', function(req, res){
    songPlaylist.addSongsToPlaylist(
      req.body.songs,
      req.body.playlist,
      req.session.user.idUsers
    );
  })

}
