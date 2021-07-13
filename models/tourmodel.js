// JavaScript source code

const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
  },
  duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
  },
  maxGroupSize:{
        type: Number,
        required: [true, 'A tour must have a group size']
  },
   difficulty:{
        type: String,
        required: [true, 'A tour must have a difficulty']
   },
  ratingAverage: {
        type: Number,
        default: 4.5,
  },
  ratingQuantity: {
        type: Number,
        default: 0,
  },
  price:{
        type: Number,
        required: [true, 'A tour must have price']
  },
  priceDiscount: Number,
  summary:{
        type: String,
        trim: true,
        required: [true, 'A tour must have summary'],
  },
  description:{
        type: String,
        trim: true,
  },
  imageCover: {
        type: String, //we are stroing image name in database, later we can read it from fs
        required: [true, 'A tour must have a cover image']
  },
  images: [String], //Array of string to store multipleimages
  createdAt: {
        type: Date,
        default: Date.now()
  },
  startDates: [Date],
});

// create model with name Tour and store variable in Tour, always use capital first letter for model name


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;