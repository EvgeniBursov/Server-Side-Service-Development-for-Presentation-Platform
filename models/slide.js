const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  content: String,
  nameOfAdd:{
    type: String,
    required: true,
  }
});

const Slide = mongoose.model('Slide', SlideSchema);

module.exports = Slide;
