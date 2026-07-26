const mongoose = require('mongoose');

const analysisRecordSchema = new mongoose.Schema({
  mode: { type: String, enum: ['whiteboard', 'prescription'], required: true },
  imageMeta: {
    filename: String,
    mimeType: String,
    sizeBytes: Number,
  },
  output: { type: mongoose.Schema.Types.Mixed, required: true },
  hasUncertainContent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AnalysisRecord', analysisRecordSchema);
