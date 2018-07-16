
var cloud_bucket = require('../controllers/uploadController.js');
const multer = require('multer');

const uploadSong = multer({
  storage: multer.MemoryStorage,
  fileFilter: function(req, file, cb) {
    console.log(file.mimetype);
    if(file.mimetype !== 'audio/wav' && file.mimetype !== 'audio/mpeg'){
      return cb(new Error('only wavs and mp3s are allowed'))
    }
    cb(null, true)
  }
});

module.exports = function(app){

  app.post('/uploadSong', uploadSong.single('songFile'), (req, res) => {
    cloud_bucket.uploadSong(req, res, console.log, () => res.status(200).send('ok'));
  });

  app.post('/deleteSongs', function(req, res){
    cloud_bucket.deleteSong(req)
    .then(() => res.status(200).send('ok'));
  })


}
