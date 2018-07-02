var imageUpload = require('../controllers/imageUploadController.js');


const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});



module.exports = function(app){

  app.post('/uploadImage', multer.single('file'), (req, res) => {
      imageUpload.uploadImage(req, res, () => {res.status(200).send('ok')});
  });

}
