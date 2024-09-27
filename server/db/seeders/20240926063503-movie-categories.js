const movies_categories = require('../../db/model/movie_categories');
'use strict';


module.exports = {
  up: (models, mongoose) => {
    
      return models.movies_categories.insertMany([

        {
          _id : "66f53b76dde88d7cd3e4383e",
          category : "Thriller"
        },
        {
          _id : "66f53b8edde88d7cd3e4383f",
          category : "Adventure"
        },
        {
          _id : "66f53ba0dde88d7cd3e43840",
          category : "Romance"
        },
        {
          _id : "66f53bb2dde88d7cd3e43841",
          category : "Mystery"
        },
        {
          _id : "66f53bc2dde88d7cd3e43842",
          category : "Horror"
        },
        {
          _id : "66f53beadde88d7cd3e43843",
          category : "sci-fi"
        },
        
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
            "66f53b76dde88d7cd3e4383e",
            "66f53b8edde88d7cd3e4383f",
            "66f53ba0dde88d7cd3e43840",
            "66f53bb2dde88d7cd3e43841",
            "66f53bc2dde88d7cd3e43842",
            "66f53beadde88d7cd3e43843"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log("seeder rollback successfull");
      console.log(res.deletedCount);
      });
    
  }
};
