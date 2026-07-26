const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
  })
);
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
