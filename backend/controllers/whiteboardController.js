const { analyzeWhiteboardImage } = require('../services/gemmaService');
const saveAnalysisSafely = require('../utils/saveAnalysis');
const GemmaServiceError = require('../utils/GemmaServiceError');

async function analyzeWhiteboard(req, res) {
  if (!req.file) {
    throw new GemmaServiceError('No image file uploaded (field name must be "image")', 400);
  }

  const imageBase64 = req.file.buffer.toString('base64');
  const mimeType = req.file.mimetype;
  const language = req.body.language === 'en' ? 'en' : 'bn';

  const result = await analyzeWhiteboardImage({ imageBase64, mimeType, language });

  res.json({ success: true, data: result });

  saveAnalysisSafely('whiteboard', {
    filename: req.file.originalname,
    mimeType,
    sizeBytes: req.file.size,
  }, result);
}

module.exports = { analyzeWhiteboard };
