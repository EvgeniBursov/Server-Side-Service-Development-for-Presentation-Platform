const express = require('express');
const router = express.Router();
const presentationController = require('../controllers/presentationController');



router.post('/presentations', presentationController.createPresentation);
router.get('/presentations/:title', presentationController.getPresentationByTitle);

module.exports = router;
