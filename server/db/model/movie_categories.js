const mongoose = require('mongoose');

const moviesCategories = new mongoose.Schema({
    category : "String"
});

module.exports = mongoose.model("movies_categories",moviesCategories);