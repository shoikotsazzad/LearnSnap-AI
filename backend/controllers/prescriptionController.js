const { analyzePrescriptionImage } = require('../services/gemmaService');
const saveAnalysisSafely = require('../utils/saveAnalysis');
const GemmaServiceError = require('../utils/GemmaServiceError');
const { getDisclaimer } = require('../utils/constants');

async function analyzePrescription(req, res) {
  if (!req.file) {
    throw new GemmaServiceError('No image file uploaded (field name must be "image")', 400);
  }

  const imageBase64 = req.file.buffer.toString('base64');
  const mimeType = req.file.mimetype;
  const language = req.body.language === 'en' ? 'en' : 'bn';

  const result = await analyzePrescriptionImage({ imageBase64, mimeType, language });
  const responseData = { ...result, disclaimer: getDisclaimer(language) };

  res.json({ success: true, data: responseData });

  saveAnalysisSafely('prescription', {
    filename: req.file.originalname,
    mimeType,
    sizeBytes: req.file.size,
  }, responseData);
}

module.exports = { analyzePrescription };
