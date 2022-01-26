const mongoose = require('mongoose');

const {Schema} = mongoose;

const currentBookSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    totalPages: {
        type: String,
        trim: true
    },
    pagesRead: {
        type: String,
        trim: true
    },
    owner: {
        type: String,
        required: true,
        trim: true,
      },
});

const CurrentBook = mongoose.model('CurrentBook', currentBookSchema);

module.exports = CurrentBook;