const Presentation = require('../models/presentation');
const Slide = require('../models/slide');

const creatingNewPresentation = async (req, res) =>{
  var req_title = req.body.title;
  var req_authors = req.body.authors;
  var req_date = req.body.publishDate;
  var req_slides = req.body.slides;
  try {
    const presentation = await Presentation.findOne({'title': req_title});
    if(presentation != null){
      return res.status(400).send('Title is exist - title need be unique');
    }

    const data = new Presentation({
      title: req_title,
      authors: req_authors,
      publishDate: req_date,
      slides: req_slides,
    })
    const newPresentation = await data.save();
    res.status(200).send(newPresentation);
  } catch (err) {
    res.status(400).send(err);
  }
}


const getPresentationByTitle = async (req, res) =>{
  try {
    const presentation = await Presentation.findOne({'title': req.body.title});
    res.status(200).send(presentation);
  } catch (err) {
    res.status(400).send(err);
  }
}


const deletePresentation = async (req, res) =>{
  try {
    const presentation = await Presentation.findOneAndDelete({'title': req.body.title});
    res.status(200).send('Presentation deleted');
  } catch (err) {
    res.status(400).send(err);
  }
}


const getAllPresentation = async (req, res) =>{
  try {
    const presentation = await Presentation.find();
    if (!presentation) {
      return res.status(404).send('Presentations not found');
    }
    res.status(200).send(presentation);
  } catch (err) {
    res.status(400).send(err);
  }
}


const changePresentationAuthors = async (req, res) =>{
  try {
    const presentation = await Presentation.findOne({'title': req.body.title});
    if (!presentation) {
      return res.status(404).send('Presentation not found');
    }
    const newAuthorsList = req.body.authors;
    const addAuthorsToTheList = req.body.add; 

    if (addAuthorsToTheList) {
      newAuthorsList.forEach(author => {
        if (!presentation.authors.includes(author)) {
          presentation.authors.push(author);
        }
      });
    } else {
      presentation.authors = newAuthorsList;
    }
    await presentation.save();
    res.status(200).send('Authors List updated');
  } catch (err) {
    res.status(400).send(err);
  }
}


const addSlideToPresentation = async (req, res) =>{
  try {
    const presentation = await Presentation.findOne({'title': req.body.presentationTitle});
    if (!presentation) {
      return res.status(404).send('Presentations not found');
    }
    const newSlide = {
      title: req.body.slideTitle,
      content: req.body.content,
      nameOfAdd: req.body.name,
    }
    presentation.slides.push(newSlide);
    await presentation.save();
    res.status(200).send(presentation);
  } catch (err) {
    res.status(400).send(err);
  }
}


const deleteSlideFromPresentation = async (req, res) =>{
  try {
    const presentation = await Presentation.findOne({'title': req.body.presentationTitle});
    if (!presentation) {
      return res.status(404).send('Presentations not found');
    }
    const slideId = req.body.slideId;
    const slideIndex = presentation.slides.findIndex(slide => slide._id.toString() === slideId);
    if (slideIndex === -1) {
      return res.status(404).send('Slide not found');
    }
    presentation.slides.splice(slideIndex, 1);
    await presentation.save();
    res.status(200).send(presentation);
  } catch (err) {
    res.status(400).send(err);
  }
}


const changeSlideInPresentation = async (req, res) => {
  try {
    const presentation = await Presentation.findOne({ 'title': req.body.presentationTitle });
    if (!presentation) {
      return res.status(404).send('Presentation not found');
    }
    const slideId = req.body.slideId;
    const slideIndex = presentation.slides.findIndex(slide => slide._id.toString() === slideId);
    if (slideIndex === -1) {
      return res.status(404).send('Slide not found');
    }
    if (req.body.slideTitle) {
      presentation.slides[slideIndex].title = req.body.slideTitle;
    }
    if (req.body.content) {
      presentation.slides[slideIndex].content = req.body.content;
    }
    if (req.body.name) {
      presentation.slides[slideIndex].nameOfAdd = req.body.name;
    }
    await presentation.save();
    res.status(200).send(presentation);
  } catch (err) {
    res.status(400).send(err);
  }
};



module.exports = {
  creatingNewPresentation,
  getPresentationByTitle,
  deletePresentation,
  getAllPresentation,
  changePresentationAuthors,
  addSlideToPresentation,
  deleteSlideFromPresentation,
  changeSlideInPresentation,
};