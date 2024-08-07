const Presentation = require('../models/presentation');

exports.addSlideToPresentation = async (req, res) => {
  try {
    const presentation = await Presentation.findById(req.params.presentationId);
    if (!presentation) {
      return res.status(404).send();
    }
    presentation.slides.push(req.body);
    await presentation.save();
    res.status(201).send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Additional controller methods for altering, deleting slides, etc.
