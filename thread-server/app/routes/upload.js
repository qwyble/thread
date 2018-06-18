
var cloud_bucket = require('../controllers/uploadController.js');
const multer = require('multer');

const upload = multer({
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

  app.post('/upload', upload.single('songFile'), (req, res) => {
    cloud_bucket.upload(req, res, console.log, () => res.send());
  });


}
