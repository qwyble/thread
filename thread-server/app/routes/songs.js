var songs  = require('../controllers/songController.js');

module.exports = function(app){
  app.get('/stream/:playlist', function(req, res){
    songs.get(
      req.params.playlist,
      req.session.user.idUsers
    ).then((data) => {
      console.log();
    });
  });
}
