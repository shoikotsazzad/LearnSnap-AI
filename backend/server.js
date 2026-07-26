require('dotenv').config();

const app = require('./app');
const connectDB = require('./utils/db');

const PORT = process.env.PORT || 5000;

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`LearnSnap AI backend listening on http://localhost:${PORT}`);
  });
});
