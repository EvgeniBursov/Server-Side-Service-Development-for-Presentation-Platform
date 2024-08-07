const express = require('express');
const router = express.Router();
const {
  creatingNewPresentation,
  getPresentationByTitle,
  deletePresentation,
  getAllPresentation,
  changePresentationAuthors,
  addSlideToPresentation,
  deleteSlideFromPresentation,
  changeSlideInPresentation
} = require('../controllers/presentationController');

//create a new presentation
router.post('/presentations', creatingNewPresentation);

//get a presentation by title
router.get('/presentations/title', getPresentationByTitle);

//delete presentation
router.delete('/presentations', deletePresentation);

//get all presentations
router.get('/presentations', getAllPresentation);

//change author
router.put('/presentations/authors', changePresentationAuthors);

//add a slide
router.post('/presentations/slides', addSlideToPresentation);

//delete a slide
router.delete('/presentations/slides', deleteSlideFromPresentation);

//change a slide
router.put('/presentations/slides', changeSlideInPresentation);

module.exports = router;
