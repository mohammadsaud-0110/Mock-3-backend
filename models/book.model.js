const mongoose = require("mongoose");

const bookSchema=new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    price: Number
})

const BookModel = mongoose.model('book', bookSchema);

module.exports = BookModel;

// - Title
// - Author
// - Genre (a dropdown select tag with the following values: Fiction, Science, Comic)
// - Description (a textarea input field)
// - Price