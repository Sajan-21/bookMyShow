const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    language : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    release_date : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    cast : {
        type : String,
        required : true
    },
    crew : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    }

});

module.exports = mongoose.model("movies",moviesSchema);