const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const presentationRoutes = require('./routes/present_route');
const slideRoutes = require('./routes/slide_route');

const app = express();
app.use(bodyParser.json());
app.use(presentationRoutes);
app.use(slideRoutes);

const DATABASE_URL = "mongodb+srv://evgenbu2:xq8zmS4ABlsldbMa@webproject.fupstrj.mongodb.net/"
mongoose.connect(DATABASE_URL)
.then((result) => {
    console.log('Connected to the DataBase successfully');
  })
.catch((err) => console.log(err));


module.exports = app;
