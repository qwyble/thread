
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
  uploadSong: function (req, res, next, fin) {
      songFileToBucket(req, res, next, fin);
  },

  deleteSong: function(req){
    return (
      deleteFile(
        req.body.songIds,
        req.session.user.idUsers
      )
    );
  }
}


deleteFile = (songIds, user) => {
  return (
    sequelize.query(
      `DELETE FROM songs
      WHERE idSongs IN (?) AND owner = ?`,{
        replacements: [songIds, user],
        type: sequelize.QueryTypes.DELETE
      }
    )
  )
}



//send file to cloud bucket
songFileToBucket = (req, res, next, fin) => {
    const file = req.file;
    var url = '';
    const gcsname = uuidv4() + file.originalname;
    file2 = myBucket.file(gcsname);
    const stream = file2.createWriteStream({
      metadata: {contentType: file.mimetype},
      gzip: true
    });
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
  
        songMetaToDb(req, url, res, gcsname);
        fin()
      });
    });
    stream.end(file.buffer);
}

//send metadata to mysql
songMetaToDb = (req, url, res, gcsname) => {
  Song.create({
    title: req.body.title,
    description: req.body.description,
    genres: req.body.genres,
    owner: req.session.user.idUsers,
    dateUploaded: new Date(),
    URL: url,
    fileName: gcsname,
  })
}
