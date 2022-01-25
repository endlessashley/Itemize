const mongoose = require('mongoose');

const { Schema } = mongoose;

const novelSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  rank: {
    type: Number,
  },
  isComplete: {
    type: String,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },


});

const Novel = mongoose.model('Novel', novelSchema);

module.exports = Novel;