const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { getHistory } = require('../controllers/historyController');

const router = express.Router();

router.get('/', asyncHandler(getHistory));

module.exports = router;
