
var Promise = require('bluebird');
var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));
const uuidv4 = require('uuid/v4');

const {sequelize, Sequelize} = require('../db/dbConnect.js');
const Song = require('../models/song.js')(sequelize, Sequelize);


var storage = GoogleCloudStorage({
  projectId: 'thread-204819',
  keyFilename: './thread-projectowner.json'
});

var BUCKET_NAME = 'thread_song_bucket';

var myBucket = storage.bucket(BUCKET_NAME);

function getPublicUrl (file_name) {
  console.log(`https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`)
  return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`;
}


module.exports = {
  upload: function (req, res, next, fin) {
      fileToBucket(req, res, next, fin);
  }
}
//send file to cloud bucket
fileToBucket = (req, res, next, fin) => {
    const file = req.file;
    var url = '';
    const gcsname = uuidv4() + file.originalname;
    file2 = myBucket.file(gcsname);
    const stream = file2.createWriteStream({metadata: {contentType: file.mimetype}});
    stream.on('error', (err) => {
      file.cloudStorageError = err;
      next(err);
    });
    stream.on('finish', () => {
      file.cloudStorageObject = gcsname;
      file2.makePublic().then(() => {
        file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        url = file.cloudStoragePublicUrl;
        return url;
      }).then((url) => {
        console.log('upload complete');
        metaToDb(req, url, res);
        fin()
      });
    });
    stream.end(file.buffer);
}

//send metadata to mysql
metaToDb = (req, url, res) => {
  Song.create({
    title: req.body.title,
    description: req.body.description,
    genres: req.body.genres,
    owner: req.session.user.idUsers,
    dateUploaded: new Date(),
    URL: url
  })
}
