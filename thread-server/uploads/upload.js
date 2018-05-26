
var Promise = require('bluebird');
var GoogleCloudStorage = Promise.promisifyAll(require('@google-cloud/storage'));
const uuidv4 = require('uuid/v4');


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
  upload: function (file, res, next) {
    const gcsname = uuidv4() + file.originalname;
    file2 = myBucket.file(gcsname);
    //const file = myBucket.file(gcsname)
    const stream = file2.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on('error', (err) => {
      file.cloudStorageError = err;
      next(err);
    });

    stream.on('finish', () => {
      file.cloudStorageObject = gcsname;
      file2.makePublic().then(() => {
        file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      });
      console.log('upload complete');
    });

    stream.end(file.buffer);
  },

}
