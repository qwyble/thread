var songPlaylist = require('../controllers/songPlaylistController.js');

module.exports = function(app){

  app.post('/addSongsToPlaylist', function(req, res, next){
    songPlaylist.addSongsToPlaylist(
      req.body.songs,
      req.body.playlist,
      req.session.user.idUsers
    ).then((result) => {res.status(200).send({message: "Playlist Updated"})});

  });

}
