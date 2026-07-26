const express = require('express');
const upload = require('../middleware/upload');
const asyncHandler = require('../utils/asyncHandler');
const { analyzeWhiteboard } = require('../controllers/whiteboardController');

const router = express.Router();

router.post('/analyze', upload.single('image'), asyncHandler(analyzeWhiteboard));

module.exports = router;
