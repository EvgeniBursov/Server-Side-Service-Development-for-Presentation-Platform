const express = require('express');
const router = express.Router();
const slideController = require('../controllers/slideController.js');

router.post('/presentations/:presentationId/slides', slideController.addSlideToPresentation);

// Additional routes for altering, deleting slides, etc.

module.exports = router;
