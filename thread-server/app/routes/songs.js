var songs  = require('../controllers/songController.js');

module.exports = function(app){
  app.get('/stream/:playlist', function(req, res){

      songs.isPublic(
        req.params.playlist
      ).then((data) => {
        if(data[0].isPublic){
          songs.getPubPlaylist(
            req.params.playlist
          ).then((data) => {
            console.log();
            res.status(200).send(data);
          });
        }else{
          songs.getPrivPlaylist(
            req.params.playlist,
            req.session.user.idUsers
          ).then((data) => {
            console.log();
            res.status(200).send(data);
          });
        }
      })

  });

  app.get('/stream', function(req, res){
    songs.getStream(
      req.session.user.idUsers
    ).then((data) => {
      res.status(200).send(data);
    });
  });

  app.post('/rateSong', function(req, res){
    songs.rateSong(
      req.body.songId,
      req.body.rating,
      req.session.user.idUsers
    )
  })
}
