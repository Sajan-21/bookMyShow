const movies_categories = require('../../db/model/movie_categories');
'use strict';


module.exports = {
  up: (models, mongoose) => {
    
      return models.movies_categories.insertMany([
        {
          _id : "66f504be7975cc97adb8c962",
          category : "Thriller"
        },
        {
          _id : "66f5088d7975cc97adb8c963",
          category : "horror"
        }
      ]).then(res => {
      // Prints "1"
      console.log("seeding successfull");
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
    
      return models.movie_categories.deleteMany({
        _id : {
          $in : [
            "66f504be7975cc97adb8c962",
            "66f5088d7975cc97adb8c963"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log("seeder rollback successfull");
      console.log(res.deletedCount);
      });
    
  }
};
