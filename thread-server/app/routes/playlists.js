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
    ).then(() => res.status(200).send('ok'));
  }),

  app.get('/getPlaylists/:profile', function(req, res){
    playlist.getCats(
      req.session.user.idUsers,
      req.params.profile
    ).then((cats) => {
      playlist.getCatOwner(
        req.params.profile
      ).then((owner) => {
        var data = {cats: cats, owner: owner};
        return data;
      }).then((data) => {res.status(200).send(data);});
    })
  })

  app.get('/getPlaylists', function(req, res){
    playlist.getCats(
      req.session.user.idUsers
    ).then((cats) => {
      playlist.getCatOwner(
        req.session.user.idUsers
      ).then((owner) => {
        var data = {cats: cats, owner: owner};
        return data;
      }).then((data) => {res.status(200).send(data);})
    });
  })

  app.post('/renameCat', function(req, res){
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

  app.post('/clonePlaylist', function(req, res){
    var songsList = [];
    playlist.getSongsForClone(
      req.body.plToClone
    ).then((result) => {
      songsList = result;
      playlist.addPlaylist(
        req.body.selectedCat,
        req.body.plname
      ).then((result) => {
        var plid = result[0]
        playlist.clonePlaylist(
          songsList,
          plid
        ).then((result) => {res.status(200).send('ok')});
      });
    });
  });

  app.get('/getCatsOnly', function(req, res){
    playlist.getCatsOnly(
      req.session.user.idUsers
    ).then((result) => {res.status(200).send(result)});
  });



}
