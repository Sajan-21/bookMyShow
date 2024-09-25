const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

let mongoConnect = async function() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connection established...");
        
    } catch (error) {

        console.log("error while connecting database : ",error);
        
    }

}

module.exports = mongoConnect;