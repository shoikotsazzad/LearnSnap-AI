const mongoose = require('mongoose');
const AnalysisRecord = require('../models/AnalysisRecord');

async function saveAnalysisSafely(mode, imageMeta, output) {
  if (mongoose.connection.readyState !== 1) return;

  try {
    const hasUncertainContent = JSON.stringify(output).includes('[?]');
    await AnalysisRecord.create({ mode, imageMeta, output, hasUncertainContent });
  } catch (err) {
    console.warn(`Failed to persist analysis record: ${err.message}`);
  }
}

module.exports = saveAnalysisSafely;
