const express = require('express');
const whiteboardRoutes = require('./whiteboardRoutes');
const prescriptionRoutes = require('./prescriptionRoutes');
const historyRoutes = require('./historyRoutes');

const router = express.Router();

router.get('/health', (req, res) => res.json({ success: true, status: 'ok' }));
router.use('/whiteboard', whiteboardRoutes);
router.use('/prescription', prescriptionRoutes);
router.use('/history', historyRoutes);

module.exports = router;
