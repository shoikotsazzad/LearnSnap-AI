const express = require('express');
const upload = require('../middleware/upload');
const asyncHandler = require('../utils/asyncHandler');
const { analyzePrescription } = require('../controllers/prescriptionController');

const router = express.Router();

router.post('/analyze', upload.single('image'), asyncHandler(analyzePrescription));

module.exports = router;
