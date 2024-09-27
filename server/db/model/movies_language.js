const mongoose = require('mongoose');

const moviesLanguage = new mongoose.Schema({
    language : "String"
});

module.exports = mongoose.model("movies_languages",moviesLanguage);