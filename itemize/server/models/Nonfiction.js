const mongoose = require('mongoose');

const { Schema } = mongoose;

const nonfictionSchema = new Schema({
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

const Nonfiction = mongoose.model('Nonfiction', nonfictionSchema);

module.exports = Nonfiction;