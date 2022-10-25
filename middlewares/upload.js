const multer = require('multer');
const path = require('path');


const tmpDir = path.join(__dirname, '../', 'tmp');

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    // Jimp.read(tmpDir)
    //   .then(image => {
    //     return image.resize(250, 250);
    //   })
    //   .catch(err => {
    //     throw RequestError(err.status, err.message);
    //   });
 
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
