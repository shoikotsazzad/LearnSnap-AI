const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI not set, running in demo mode, persistence disabled');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.warn(`MongoDB connection failed, persistence disabled: ${err.message}`);
  }
}

module.exports = connectDB;
