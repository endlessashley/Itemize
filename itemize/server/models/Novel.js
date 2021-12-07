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
    type: Boolean,
  }
//   category: {
//     type: Schema.Types.ObjectId,
//     ref: 'Category',
//     required: true
//   }
});

const Novel = mongoose.model('Novel', novelSchema);

module.exports = Novel;