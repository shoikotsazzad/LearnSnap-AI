const multer = require('multer');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof multer.MulterError || err.message?.includes('Only JPG and PNG')) {
    return res.status(400).json({ success: false, message: err.message });
  }

  const statusCode = err.statusCode || 500;
  const message = err.name === 'GemmaServiceError'
    ? err.message
    : statusCode === 500
      ? 'Something went wrong on the server'
      : err.message;

  res.status(statusCode).json({ success: false, message });
}

module.exports = errorHandler;
