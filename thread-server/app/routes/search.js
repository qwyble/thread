var search = require('../controllers/searchController.js');


module.exports = function(app){

  app.get('/getAllSearch/:searchString?', function(req, res){
    search.getUsers(req.params.searchString).then((users) => {
      search.getSongs(req.params.searchString).then((songs) => {
        search.getPlaylists(req.params.searchString).then((playlists) => {
          var data = {users: users, songs: songs, playlists: playlists};
          res.send(data);
        })
      })
    });
  })


  app.get('/emailSearch', function(req,res){
    search.getUsers(req.query.searchString)
    .then((users) =>{ res.status(200).send(users) })
  })
}
