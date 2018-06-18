
var Promise = require('bluebird');
var Storage = Promise.promisifyAll(require('@google-cloud/storage'));

const {sequelize, Sequelize} = require('../db/dbConnect.js');

const BUCKET_NAME = 'thread_image_bucket';

const storage = Storage({
  projectId: 'thread-204819',
  keyFilename: './thread-projectowner.json'
});

var bucket = storage.bucket(BUCKET_NAME);

function getPublicUrl (file_name) {
  console.log(`https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`)
  return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`;
}



module.exports = {
  upload: function (req, res, fin) {
      fileToBucket(req, res, fin);
  }
}


//send file to cloud bucket
fileToBucket = (req, res, fin) => {
    if (!req.file) {
      return;
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata:{
        contentType: req.file.mimetype
      },
      resumable: false
    });

    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
    });

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname;
      file.makePublic().then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        url = req.file.cloudStoragePublicUrl;
        return url;
      }).then((url) => {
        metaToDb(req.session.user.idUsers, url).then(() => fin());
      });
    });
    stream.end(req.file.buffer);
}

//send metadata to mysql
metaToDb = (user, url) => {
  return(
    sequelize.query(
      `UPDATE users
        SET users.imageUrl = ?
      WHERE users.idUsers = ?`,{
        replacements: [url, user],
        type: sequelize.QueryTypes.UPDATE
      }
    )
  )
}
