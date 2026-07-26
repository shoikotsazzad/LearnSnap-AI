const multer = require('multer');
const { ALLOWED_IMAGE_MIME_TYPES, MAX_IMAGE_SIZE_BYTES } = require('../utils/constants');

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error('Only JPG and PNG images are allowed'));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_IMAGE_SIZE_BYTES },
});

module.exports = upload;
