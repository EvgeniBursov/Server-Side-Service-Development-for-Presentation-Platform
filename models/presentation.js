const mongoose = require('mongoose');
const Slide = require('./slide');

const PresentationSchema = new mongoose.Schema({
    title:{
        type: String, 
        unique: true,
        required: true
},
  authors:{
    type: [String],
  },
  publishDate:{
        type: Date, default: Date.now
},
  slides: [Slide]
});

module.exports = mongoose.model('Presentation', PresentationSchema);
