var songs  = require('../controllers/songController.js');

module.exports = function(app){
  app.get('/playlist/:playlist', function(req, res){

      songs.isPublic(
        req.params.playlist
      ).then((data) => {
        if(data[0].isPublic){
          songs.getPubPlaylist(
            req.params.playlist,
            encodeURI(req.query.sortBy),
            encodeURI(req.query.descending)
          ).then((data) => {
            res.status(200).send([data, []]);
          });
        }else{
          songs.getPrivPlaylist(
            req.params.playlist,
            req.session.user.idUsers,
            encodeURI(req.query.sortBy),
            encodeURI(req.query.descending)
          ).then((data) => {
            res.status(200).send([data, []]);
          });
        }
      })

  });

  app.get('/stream', function(req, res){
    songs.getStream(
      req.session.user.idUsers,
      encodeURI(req.query.sortBy),
      encodeURI(req.query.descending),
      encodeURI(req.query.currentItem)
    ).then((data) => {
      songs.getStreamCount(req.session.user.idUsers)
      .then((data2) => {

        res.status(200).send([data, data2]);

      })
    });
  });

  app.get('/profile/:profile', function(req, res){
    songs.getProfile(
      req.params.profile,
      req.session.user.idUsers,
      encodeURI(req.query.sortBy),
      encodeURI(req.query.descending)
    ).then(data => res.status(200).send([data, []]));
  });

  app.post('/rateSong', function(req, res){
    songs.rateSong(
      req.body.songId,
      req.body.rating,
      req.session.user.idUsers
    ).then(() => res.status(200).send('ok'));
  });

  app.get('/getSong', function(req,res){
    songs.getSong(
      req.query.songId
    ).then(data => res.status(200).send(data));
  });
}
