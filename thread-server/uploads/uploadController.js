var cloud_bucket = require('./upload.js');

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

app.post('/upload', upload.single('songFile'), (req, res) => {
  res.send();
  cloud_bucket.upload(req.file);
  res.end();

});
