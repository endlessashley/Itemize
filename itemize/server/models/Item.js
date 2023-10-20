const { Schema, model } = require('mongoose');

const itemsSchema = new Schema({
  //The list in which to group the items (e.g. "novels", "nonfiction", "movies")
  type: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  range: {
    type: Number,
  },
  rank: {
    type: Number,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  config: {
    type: Object
  },
  created: { 
    type: Date, 
    default: Date.now 
  },
  updated: {
    type: Date, 
    default: Date.now 
  },

});

const Item = model('Item', itemsSchema);

module.exports = Item;