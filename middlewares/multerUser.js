const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage ( {
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/images/usuarios'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})


const uploadUser = multer({ storage})

module.exports = uploadUser;