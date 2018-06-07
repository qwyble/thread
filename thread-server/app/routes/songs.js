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

  app.get('/stream', function(req, res){
    songs.getStream(
      req.session.user.idUsers
    ).then((data) => {
      res.status(200).send(data);
    });
  });
}
