const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
});

module.exports = mongoose.model("movies",moviesSchema);