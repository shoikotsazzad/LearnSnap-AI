const mongoose = require('mongoose');
const AnalysisRecord = require('../models/AnalysisRecord');

async function getHistory(req, res) {
  if (mongoose.connection.readyState !== 1) {
    return res.json({ success: true, data: [], dbConnected: false });
  }

  const records = await AnalysisRecord.find().sort({ createdAt: -1 }).limit(20).lean();
  res.json({ success: true, data: records, dbConnected: true });
}

module.exports = { getHistory };
